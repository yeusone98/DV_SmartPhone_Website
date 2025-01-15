import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// Tên collection trong MongoDB
const REVIEW_COLLECTION_NAME = 'reviews'

// **Schema Validation** cho Review
const REVIEW_SCHEMA = Joi.object({
    product_id: Joi.string().required(), // ID của sản phẩm (string dạng ObjectId)
    customer_id: Joi.string().required(), // ID của người dùng (string dạng ObjectId)
    rating: Joi.number().min(1).max(5).required(), // Số sao (1-5)
    comment: Joi.string().required(), // Nội dung bình luận
    createdAt: Joi.date().timestamp().default(Date.now) // Ngày tạo
})

// **Validate dữ liệu trước khi lưu**
const validateBeforeCreate = async (data) => {
    return await REVIEW_SCHEMA.validateAsync(data, { abortEarly: false })
}

// **Tạo một Review**
const createReview = async (data) => {
    const validData = await validateBeforeCreate(data) // Xác thực dữ liệu
    const result = await GET_DB()
        .collection(REVIEW_COLLECTION_NAME)
        .insertOne(validData) // Thêm review vào DB
    return result
}

// **Tìm tất cả review của một sản phẩm**
const getReviewsByProduct = async (productId) => {
    const results = await GET_DB()
        .collection(REVIEW_COLLECTION_NAME)
        .find({ product_id: productId }) // Tìm tất cả review theo product_id
        .toArray()
    return results
}

// **Xóa review theo ID**
const deleteReviewById = async (reviewId) => {
    const result = await GET_DB()
        .collection(REVIEW_COLLECTION_NAME)
        .deleteOne({ _id: new ObjectId(reviewId) }) // Xóa review theo ObjectId
    return result.deletedCount > 0 // Trả về true nếu xóa thành công
}

export const reviewModel = {
    createReview,
    getReviewsByProduct,
    deleteReviewById
}
