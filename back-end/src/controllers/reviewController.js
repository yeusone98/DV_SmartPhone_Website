import { reviewModel } from '~/models/reviewModel'
import { StatusCodes } from 'http-status-codes'
import { create } from 'lodash'

const createReview = async (req, res, next) => {
    try {
        const { product_id, rating, comment } = req.body;
        console.log('JWT Decoded:', req.jwtDecoded);
        const customer_id = req.jwtDecoded?._id; // Đảm bảo token hợp lệ
        
        if (!customer_id) throw new Error('Unauthorized!');

        const newReview = {
            product_id,
            customer_id,
            rating,
            comment,
            createdAt: new Date()
        };

        const result = await reviewModel.createReview(newReview);
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(error);
    }
};



const getReviewsByProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const reviews = await reviewModel.getReviewsByProduct(productId);
        // Thay vì trả về 404 khi không có review, trả về danh sách rỗng
        res.status(StatusCodes.OK).json(reviews || []); 
    } catch (error) {
        next(error);
    }
};



const deleteReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params
        const result = await reviewModel.deleteReviewById(reviewId) // Xóa review

        if (result) {
            res.status(StatusCodes.OK).json({ message: 'Review deleted successfully!' })
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
    deleteReview
}
