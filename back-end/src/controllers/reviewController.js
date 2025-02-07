import { reviewModel } from '~/models/reviewModel'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// 🎯 Tạo đánh giá sản phẩm (CHỈ CUSTOMER)
const createReview = async (req, res, next) => {
    try {
        const { product_id, rating, comment } = req.body
        const userId = req.jwtDecoded?._id
        const userRole = req.jwtDecoded?.role

        // Chặn admin không được tạo review
        if (userRole === 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Admin không thể viết đánh giá sản phẩm!' })
        }

        // ✅ Truy xuất username từ userId
        const user = await GET_DB().collection('users').findOne({ _id: new ObjectId(userId) })
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Người dùng không tồn tại!' })

        const newReview = {
            product_id,
            customer_id: userId,
            username: user.displayName || user.username, // Dùng displayName nếu có
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

// Lấy danh sách đánh giá theo sản phẩm
const getReviewsByProduct = async (req, res, next) => {
    try {
        const { productId } = req.params
        const reviews = await reviewModel.getReviewsByProduct(productId)
        res.status(StatusCodes.OK).json(reviews || [])
    } catch (error) {
        next(error)
    }
}

// 🎯 Xóa đánh giá (Chỉ customer sở hữu hoặc admin được xóa)
const deleteReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params
        const userId = req.jwtDecoded._id
        const userRole = req.jwtDecoded.role

        // ✅ Tìm review theo ID
        const review = await GET_DB().collection('reviews').findOne({ _id: new ObjectId(reviewId) })
        if (!review) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Đánh giá không tồn tại!' })

        // Chỉ admin hoặc chính chủ mới có thể xóa
        if (review.customer_id !== userId && userRole !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Bạn không có quyền xóa đánh giá này!' })
        }

        // Xóa review
        const result = await reviewModel.deleteReviewById(reviewId)
        res.status(StatusCodes.OK).json({ message: 'Xóa đánh giá thành công!' })
    } catch (error) {
        next(error)
    }
}

// 🎯 Thêm phản hồi vào review (CHỈ ADMIN)
const addReply = async (req, res, next) => {
    try {
        const { reviewId } = req.params
        const { reply } = req.body
        const adminId = req.jwtDecoded._id
        const adminRole = req.jwtDecoded.role

        // Chỉ admin mới được phản hồi
        if (adminRole !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Bạn không có quyền phản hồi đánh giá!' })
        }

        // Lấy displayName của admin
        const admin = await GET_DB().collection('users').findOne({ _id: new ObjectId(adminId) })
        if (!admin) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin không tồn tại!' })

        const replyData = {
            admin_id: adminId,
            admin_name: admin.displayName || admin.username,
            reply,
            createdAt: new Date()
        }

        const result = await reviewModel.addReplyToReview(reviewId, replyData)

        if (result) {
            res.status(StatusCodes.OK).json({ message: 'Thêm phản hồi thành công!', reply: replyData })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Đánh giá không tồn tại!' })
        }
    } catch (error) {
        next(error)
    }
}

const deleteReply = async (req, res, next) => {
    try {
        const { reviewId, replyIndex } = req.params;
        const userId = req.jwtDecoded._id; // ID của người đang đăng nhập
        const userRole = req.jwtDecoded.role; // Role của user

        const review = await GET_DB()
            .collection('reviews')
            .findOne({ _id: new ObjectId(reviewId) });

        if (!review) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found!' });
        }

        // Kiểm tra phản hồi có tồn tại không
        if (!review.replies || review.replies.length <= replyIndex) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reply not found!' });
        }

        const reply = review.replies[replyIndex];

        // Admin chỉ được xóa phản hồi của chính mình
        if (userRole !== 'admin' || reply.admin_id !== userId) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'You can only delete your own replies!' });
        }

        // Xóa phản hồi khỏi mảng replies
        const updatedReplies = review.replies.filter((_, index) => index !== Number(replyIndex));

        await GET_DB()
            .collection('reviews')
            .updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { replies: updatedReplies } }
            );

        res.status(StatusCodes.OK).json({ message: 'Reply deleted successfully!' });
    } catch (error) {
        next(error);
    }
};




export const reviewController = {
    createReview,
    getReviewsByProduct,
    deleteReview,
    addReply,
    deleteReply
}
