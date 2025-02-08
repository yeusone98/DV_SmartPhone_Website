import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validator'


/*
    1. Không cần custom message phía BE: Thường thì không cần tùy chỉnh thông báo lỗi ở phía BE
    vì FE có thể tự thực hiện việc này để hiển thị thông báo đẹp mắt và thân thiện hơn.
    2. BE chỉ cần đảm bảo dữ liệu chuẩn xác: Phía BE chỉ cần đảm bảo rằng việc xác thực dữ liệu là chính xác
    và có thể trả về thông báo mặc định từ thư viện xác thực.
    3. Quan trọng về validate ở BE: Việc xác thực dữ liệu ở BE là bắt buộc, vì đây là nơi cuối cùng để lưu trữ dữ liệu vào cơ sở dữ liệu,
    đảm bảo rằng dữ liệu không bị sai lệch hoặc có lỗi khi lưu trữ.
    4. Thực tế nên validate cả BE và FE: Để hệ thống hoạt động an toàn và hiệu quả nhất
    nên thực hiện xác thực dữ liệu ở cả hai phía, đảm bảo dữ liệu không chỉ chính xác khi nhập liệu (ở FE) mà còn được kiểm tra lại trước khi lưu trữ (ở BE).
*/


const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
        password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE)
    })
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}

const verifyAccount = async (req, res, next) => {
    const correctCondition = Joi.object({
        email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
        token: Joi.string().required()
    })

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}

const login = async (req, res, next) => {
    const correctCondition = Joi.object({
        email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
        password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE)
    })

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}
const forgotPassword = async (req, res, next) => {
    const correctCondition = Joi.object({
        email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE)
    })
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
}

const resetPassword = async (req, res, next) => {
    const correctCondition = Joi.object({
        email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
        token: Joi.string().required(),
        newPassword: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE)
    })
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
}

const updateCustomer = async (req, res, next) => {
    const correctCondition = Joi.object({
        displayName: Joi.string().optional(),
        password: Joi.string().min(8).optional().allow('') // Allow empty
    })

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
}

export const userValidation = {
    createNew,
    verifyAccount,
    login,
    forgotPassword,
    resetPassword,
    updateCustomer
}