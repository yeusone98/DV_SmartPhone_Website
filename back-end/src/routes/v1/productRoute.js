import express from 'express'
import { productController } from '~/controllers/productController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { upload } from '~/middlewares/uploadMiddleware'

const Router = express.Router()

Router.route('/')
    .get(authMiddleware.isAuthorized, productController.getProducts) // Client & Admin đều được phép
    .post(authMiddleware.isAuthorized, authMiddleware.isAdmin, upload.single('image'), productController.createProduct) // Chỉ admin được phép

Router.route('/:id')
    .get(authMiddleware.isAuthorized, productController.getProductById) // Client & Admin đều được phép
    .put(authMiddleware.isAuthorized, authMiddleware.isAdmin, upload.single('image'), productController.updateProduct) // Chỉ admin được phép
    .delete(authMiddleware.isAuthorized, authMiddleware.isAdmin, productController.deleteProduct) // Chỉ admin được phép


export const productRoute = Router
