/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import bcrypjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { pickUser } from '~/utils/Formatter'
import { WEBSITE_DOMAIN } from '~/utils/constants'
import { BrevoProvider } from '~/providers/BrevoProvider'
import { env } from '~/config/environment'
import { jwtProvider } from '~/providers/JwtProvider'
import bcryptjs from 'bcryptjs'

const createNew = async (reqBody) => {
    try {
        // Kiểm tra xem email đã tồn tại trong hệ thống của chúng ta hay chứng
        const existUser = await userModel.findOneByEmail(reqBody.email)
        if (existUser) {
            throw new ApiError(StatusCodes.CONFLICT, 'Email already exists!')
        }
        // Tạo data để lưu vào Database
        // nameFromEmail: lấy tên từ email, ví dụ: email:  tanvuong222@gmail.com thì nameFromEmail sẽ là tanvuong222
        const nameFromEmail = reqBody.email.split('@')[0]
        const newUser = {
            email: reqBody.email,
            password: bcrypjs.hashSync(reqBody.password, 10), // tham số thứ hai là độ phúc tạp, giá trị càng cao thì băm càng lâu
            username: nameFromEmail,
            displayName: nameFromEmail, // mặc định để giống username từ email
            verifyToken: uuidv4()
        }

        // Thực hiện lưu thông tin user vào Database
        const createdUser = await userModel.createNew(newUser)
        // Sử dụng ID của user vừa được tạo để tìm và lấy thông tin chi tiết của user
        const getNewUser = await userModel.findOneById(createdUser.insertedId)


        // Gửi email cho người dùng xác thực tài khoản
        const verificationLink = `${WEBSITE_DOMAIN}/account/verification?email=${getNewUser.email}&token=${getNewUser.verifyToken}`
        const customSubject = 'DV_SmartPhone_Website: Please verify your email address before using our services'
        const htmlContent =
        `<div>
            <h3>Hi ${getNewUser.displayName},</h3>
            <p>Thank you for signing up for our services. Please verify your email address by clicking the link below:</p>
            <a href="${verificationLink}">Verify your email address</a>
            <p>If you did not sign up for our services, please ignore this email.</p>
            <p>Thank you!</p>
        `

        // Gọi tới hàm sendEmail từ BrevoProvider để gửi email

        await BrevoProvider.sendEmail(getNewUser.email, customSubject, htmlContent)

        // return trả về dữ liệu cho phía Controller
        return pickUser(getNewUser)
    } catch (error) {throw error}
}


const verifyAccount = async (reqBody) => {
    try {
        // Query user trong Database
        const existUser = await userModel.findOneByEmail(reqBody.email) // tìm user theo email
        if (!existUser) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!') // nếu không tìm thấy user thì trả về lỗi
        }
        if (existUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account is already active')
        if (reqBody.token !== existUser.verifyToken) {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Token is invalid')
        }

        // Nếu như mọi thứ ok thì bắt đầu update lại thông tin user để verify account

        // Update thông tin user
        const updateData = {
            isActive: true,
            verifyToken: null
        }
        const updatedUser = await userModel.update(existUser._id, updateData)

        // return trả về dữ liệu cho phía Controller
        return pickUser(updatedUser)
    }
    catch (error) {
        throw error
    }
}

const login = async (reqBody) => {
    try {
        const existUser = await userModel.findOneByEmail(reqBody.email) // tìm user theo email
        if (!existUser) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!') // nếu không tìm thấy user thì trả về lỗi
        }
        if (!existUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account is not active')
        if (!bcrypjs.compareSync(reqBody.password, existUser.password)) {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your Email or Password is incorrect')
        }

        // Nếu mọi thứ ok t hì bắt đầu tạo Tokens đăng nhập để trả về phía FE
        // Thông tin sẽ đính kèm trong JWT Token bao gồm _id và email của user

        const userInfo = { _id: existUser._id, email: existUser.email }

        // Tạo ra 2 loại token, accessToken và refreshToken để trả về cho phía FE
        const accessToken = await jwtProvider.generateToken(userInfo, env.ACCESS_TOKEN_SECRET_SIGNATURE, env.ACCESS_TOKEN_LIFE)
        const refreshToken = await jwtProvider.generateToken(userInfo, env.REFRESH_TOKEN_SECRET_SIGNATURE, env.REFRESH_TOKEN_LIFE)

        // Trả về thông tin của user kèm theo 2 cái token vừa tạo ra
        return { accessToken, refreshToken, ...pickUser(existUser) }
    }
    catch (error) {
        throw error
    }
}

const forgotPassword = async (email) => {
    const user = await userModel.findOneByEmail(email)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

    const resetToken = uuidv4()
    await userModel.update(user._id, { resetToken })
    const resetLink = `${WEBSITE_DOMAIN}/reset-password?email=${user.email}&token=${resetToken}`
    const customSubject = 'Reset your password'
    const htmlContent = `
      <div>
        <h3>Hi ${user.displayName},</h3>
        <p>Please reset your password by clicking the link below:</p>
        <a href="${resetLink}">Reset Password</a>
      </div>
    `

    await BrevoProvider.sendEmail(user.email, customSubject, htmlContent)
}

const resetPassword = async ({ email, token, newPassword }) => {
    const user = await userModel.findOneByEmail(email)
    if (!user || user.resetToken !== token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token or email!')
    }

    const hashedPassword = bcryptjs.hashSync(newPassword, 10)
    await userModel.update(user._id, { password: hashedPassword, resetToken: null })
}


export const userService = {
    createNew,
    verifyAccount,
    login,
    forgotPassword,
    resetPassword
}