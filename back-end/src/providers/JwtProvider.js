import JWT from 'jsonwebtoken'

/**
 * Function tạo mới một token - cần 3 tham số đầu vào
 * userInfo: Những thông tin muốn đính kèm vào token
 * secretSignature: Chữ ký bí mật (dạng một chuỗi string ngẫu nhiên) trên docs thì để tên là privateKey
 * tokenLife: Thời gian sống của token tính theo giây
 */

const generateToken = async ( userInfo, secretSignature, tokenLife ) => {
    try {
        return JWT.sign(userInfo, secretSignature, { algorithm:'HS256', expiresIn: tokenLife })
    }
    catch (error) {
        throw new Error(error)
    }
}

/**
 * Function kiểm tra một token có hợp lệ hay không
 * Hợp lệ ở đầy là cái token được tạo ra có đúng với chữ ký bí mật secretSignature hay không
 */

const verifyToken = async ( token, secretSignature ) => {
    try {
        // Hàm verify của thư viện JWT
        return JWT.verify(token, secretSignature)
    }
    catch (error) {
        throw new Error(error)
    }
}


export const jwtProvider = {
    generateToken,
    verifyToken
}