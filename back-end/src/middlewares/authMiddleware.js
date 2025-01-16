import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { jwtProvider } from '~/providers/JwtProvider'
import ApiError from '~/utils/ApiError'

// Middleware xác thực Token từ phía Front-end gửi lên có hợp lệ hay không

const isAuthorized = async (req, res, next) => {

    // Lấy accessToken nằm trong request cookies phía  client - withCredentials trong file authorizeAxios.js

    const clientAccessToken = req.cookies?.accessToken

    // Nếu như cái clientAccessToken không tồn tại thì trả về lỗi luôn

    if (!clientAccessToken) {
        return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (Token not found)'))
    }

    try {
        // Bước 01: Thực hiện giải mã xem cái accessToken có hợp lệ không
        const accessTokenDecoded = await jwtProvider.verifyToken(clientAccessToken, env.ACCESS_TOKEN_SECRET_SIGNATURE)
        console.log(accessTokenDecoded)

        // Bước 02: Quan trọng: Nếu như cái token hợp lệ, thì sẽ cần phải lưu thông tin giải mã được vào cái req.jwtDecoded,
        // để sử dụng cho các tầng cần xử lý ở phía sau

        req.jwtDecoded = accessTokenDecoded

        // Bước 03: Cho phép cái request đi tiếp
        next()
    }


    catch (error) {
        console.log('authMidleware: ', error)
        // Nếu như cái accessToken nó bị hết hạn (expired) thì mình cần trả về một cái mã lỗi cho phía FE biết để gọi api refreshToken
        if (error?.message?.includes('jwt expired')) {
            next (new ApiError(StatusCodes.GONE, 'Need to refresh token!'))
            return
        }

        // Nếu như cái accessToken nó không hợp lệ do bất ký điều gì khác vụ hết hạn thì trả về mã 401 cho phía FE gọi api sign_out luôn

        next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (Token invalid)'))
    }

}


const isAdmin = (req, res, next) => {
    const user = req.jwtDecoded // Lấy thông tin user từ middleware isAuthorized
    console.log(user.email)
    if (user.role !== 'admin') {
        return next(new ApiError(StatusCodes.FORBIDDEN, 'Forbidden! Admin access required.')) // Trả về lỗi 403 nếu không phải admin
    }

    next() // Cho phép đi tiếp nếu user là admin
}



export const authMiddleware = { isAuthorized, isAdmin }