import express from 'express'
import { productController } from '~/controllers/productController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { upload } from '~/middlewares/uploadMiddleware'

const Router = express.Router()

Router.route('/')
    .get(productController.getProducts) // Không yêu cầu xác thực để lấy danh sách sản phẩm
    .post(authMiddleware.isAuthorized, authMiddleware.isAdmin, upload.array('images', 10), productController.createProduct) // Chỉ admin được phép

Router.route('/:id')
    .get(productController.getProductById) // Client & Admin đều được phép
    .put(authMiddleware.isAuthorized, authMiddleware.isAdmin, upload.array('images', 10), productController.updateProduct) // Chỉ admin được phép
    .delete(authMiddleware.isAuthorized, authMiddleware.isAdmin, productController.deleteProduct) // Chỉ admin được phép


export const productRoute = Router
