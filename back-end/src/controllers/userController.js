import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'
import ms from 'ms'
import { env } from '~/config/environment'
import { jwtProvider } from '~/providers/JwtProvider'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
    try {
        const createdUser = await userService.createNew(req.body)
        res.status(StatusCodes.CREATED).json(createdUser)
    } catch (error) {
        next(error)
    }
}

const verifyAccount = async (req, res, next) => {
    try {
        const result = await userService.verifyAccount(req.body)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)

        // xử lý trả về http only cookie cho phía trình duyệt
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: ms('14 days')
        })

        // trả về thông tin user và refreshToken cho phía FE

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: ms('14 days')
        })


        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}


const logout = (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'None' })
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' })

    res.status(StatusCodes.OK).json({ message: 'Logged out successfully!' })
}


const refreshToken = async (req, res, next) => {
    try {
        const clientRefreshToken = req.cookies?.refreshToken

        if (!clientRefreshToken) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (Refresh token not found)')
        }

        const decoded = await jwtProvider.verifyToken(clientRefreshToken, env.REFRESH_TOKEN_SECRET_SIGNATURE)

        const newAccessToken = await jwtProvider.generateToken(
            { _id: decoded._id, email: decoded.email },
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: ms('15m')
        })

        res.status(StatusCodes.OK).json({ message: 'Token refreshed successfully!' })
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        await userService.forgotPassword(req.body.email) // Không cần gán vào biến
        res.status(StatusCodes.OK).json({ message: 'Reset password email sent successfully!' })
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const result = await userService.resetPassword(req.body)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}


export const userController = {
    createNew,
    verifyAccount,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword
}