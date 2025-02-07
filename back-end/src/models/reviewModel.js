import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const REVIEW_COLLECTION_NAME = 'reviews'

// Schema Validation
const REVIEW_SCHEMA = Joi.object({
    product_id: Joi.string().required(),
    customer_id: Joi.string().required(),
    username: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
    replies: Joi.array().items(
        Joi.object({
            admin_id: Joi.string().required(),
            admin_name: Joi.string().required(),
            reply: Joi.string().required(),
            createdAt: Joi.date().default(new Date())
        })
    ).default([]),
    createdAt: Joi.date().default(new Date())
})

// Validate trước khi tạo
const validateBeforeCreate = async (data) => {
    return await REVIEW_SCHEMA.validateAsync(data, { abortEarly: false })
}

// Thêm Review
const createReview = async (data) => {
    const validData = await validateBeforeCreate(data)
    const result = await GET_DB()
        .collection(REVIEW_COLLECTION_NAME)
        .insertOne(validData)
    return result
}

// Lấy Review theo sản phẩm
const getReviewsByProduct = async (productId) => {
    return await GET_DB()
        .collection(REVIEW_COLLECTION_NAME)
        .find({ product_id: productId })
        .toArray()
}

// Xóa Review
const deleteReviewById = async (reviewId) => {
    const result = await GET_DB()
        .collection(REVIEW_COLLECTION_NAME)
        .deleteOne({ _id: new ObjectId(reviewId) })
    return result.deletedCount > 0
}

// Thêm phản hồi
const addReplyToReview = async (reviewId, replyData) => {
    const result = await GET_DB()
        .collection(REVIEW_COLLECTION_NAME)
        .updateOne(
            { _id: new ObjectId(reviewId) },
            { $push: { replies: replyData } }
        )
    return result.modifiedCount > 0
}





export const reviewModel = {
    createReview,
    getReviewsByProduct,
    deleteReviewById,
    addReplyToReview
}
