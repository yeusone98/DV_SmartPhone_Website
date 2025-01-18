import express from 'express'
import { reviewController } from '~/controllers/reviewController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const router = express.Router()

// Thêm một review
router.post('/', authMiddleware.isAuthorized, reviewController.createReview)

// Lấy danh sách review theo product_id
router.get('/:productId', reviewController.getReviewsByProduct)

// Xóa review (chỉ Admin hoặc chính người tạo review mới được phép xóa)
router.delete('/:reviewId', authMiddleware.isAuthorized, reviewController.deleteReview)

// Thêm phản hồi cho review (chỉ Admin mới được phép)
router.post('/:reviewId/reply', authMiddleware.isAuthorized, authMiddleware.isAdmin, reviewController.addReply);

export const reviewRoute = router
