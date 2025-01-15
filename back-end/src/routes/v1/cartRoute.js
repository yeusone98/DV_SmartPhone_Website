import express from 'express'
import { cartController } from '~/controllers/cartController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// API Routes
Router.route('/')
    .get(authMiddleware.isAuthorized, cartController.getCart) // Lấy giỏ hàng
    .post(authMiddleware.isAuthorized, cartController.addToCart) // Thêm sản phẩm vào giỏ hàng
    .put(authMiddleware.isAuthorized, cartController.updateCartItem) // Cập nhật số lượng sản phẩm
    .delete(authMiddleware.isAuthorized, cartController.removeCartItem) // Xóa sản phẩm khỏi giỏ hàng

export const cartRoute = Router
