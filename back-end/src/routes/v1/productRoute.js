import express from 'express'
import { productController } from '~/controllers/productController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { upload } from '~/middlewares/uploadMiddleware'

const Router = express.Router()

// Sử dụng upload.fields() để nhận ảnh cho cả images và variantImages
// productRoute.js

Router.route('/')
    .post(
        authMiddleware.isAuthorized,
        authMiddleware.isAdmin,
        upload.any(), // Cho phép nhận mọi loại file
        productController.createProduct
    )
    .get(productController.getProducts)

Router.route('/:id')
    .get(productController.getProductById)
    .put(authMiddleware.isAuthorized, authMiddleware.isAdmin,
        upload.any(),
        productController.updateProduct)
    .delete(authMiddleware.isAuthorized, authMiddleware.isAdmin, productController.deleteProduct)

export const productRoute = Router
