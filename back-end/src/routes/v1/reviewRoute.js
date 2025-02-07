import express from 'express'
import { reviewController } from '~/controllers/reviewController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const router = express.Router()

// Customer có thể tạo review (Admin không thể đánh giá sản phẩm)
router.post('/', authMiddleware.isAuthorized, authMiddleware.isCustomer, reviewController.createReview)

// Lấy danh sách review theo product_id
router.get('/:productId', reviewController.getReviewsByProduct)

// Xóa review (Admin hoặc chính chủ mới có quyền)
router.delete('/:reviewId', authMiddleware.isAuthorized, reviewController.deleteReview)

// Chỉ Admin có thể phản hồi review
router.post('/:reviewId/reply', authMiddleware.isAuthorized, authMiddleware.isAdmin, reviewController.addReply)


// Xóa phản hồi Xóa phản hồi của mình
router.delete('/:reviewId/reply/:replyIndex', authMiddleware.isAuthorized, authMiddleware.isAdmin, reviewController.deleteReply);


export const reviewRoute = router
