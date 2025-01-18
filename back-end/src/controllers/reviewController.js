import { reviewModel } from '~/models/reviewModel'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { create } from 'lodash'

const createReview = async (req, res, next) => {
    try {
        const { product_id, rating, comment } = req.body
        const customer_id = req.jwtDecoded?._id

        if (!customer_id) throw new Error('Unauthorized!')

        // Truy vấn cơ sở dữ liệu để lấy username
        const user = await GET_DB().collection('users').findOne({ _id: new ObjectId(customer_id) })

        if (!user) throw new Error('User not found!')

        const username = user.username // Lấy username từ cơ sở dữ liệu

        const newReview = {
            product_id,
            customer_id,
            username, // Thêm username vào review
            rating,
            comment,
            createdAt: new Date()
        }

        const result = await reviewModel.createReview(newReview)
        res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
        next(error)
    }
}


const getReviewsByProduct = async (req, res, next) => {
    try {
        const { productId } = req.params
        const reviews = await reviewModel.getReviewsByProduct(productId)
        // Thay vì trả về 404 khi không có review, trả về danh sách rỗng
        res.status(StatusCodes.OK).json(reviews || [])
    } catch (error) {
        next(error)
    }
}


const deleteReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params
        const userId = req.jwtDecoded._id // Lấy ID người dùng từ token
        const userRole = req.jwtDecoded.role // Lấy vai trò người dùng từ token

        // Tìm review theo ID
        const review = await GET_DB()
            .collection('reviews')
            .findOne({ _id: new ObjectId(reviewId) })

        if (!review) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found!' })
        }

        // Kiểm tra quyền: chỉ người sở hữu đánh giá hoặc admin mới được phép xóa
        if (review.customer_id !== userId && userRole !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not allowed to delete this review!' })
        }

        // Thực hiện xóa
        const result = await reviewModel.deleteReviewById(reviewId)

        if (result) {
            res.status(StatusCodes.OK).json({ message: 'Review deleted successfully!' })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete review!' })
        }
    } catch (error) {
        next(error)
    }
}

const addReply = async (req, res, next) => {
    try {
        const { reviewId } = req.params
        const { reply } = req.body

        const admin_id = req.jwtDecoded._id // ID của admin từ token
        const admin_name = req.jwtDecoded.username // Lấy tên admin

        if (!reply) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing reply content!' })
        }

        const replyData = {
            admin_id,
            admin_name,
            reply,
            createdAt: new Date()
        }

        const result = await reviewModel.addReplyToReview(reviewId, replyData)

        if (result) {
            res.status(StatusCodes.OK).json({ message: 'Reply added successfully!' })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found!' })
        }
    } catch (error) {
        next(error)
    }
}


export const reviewController = {
    createReview,
    getReviewsByProduct,
    deleteReview,
    addReply
}
