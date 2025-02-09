import express from 'express'
import { placeOrderController } from '~/controllers/placeOrderController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/')
    .post(authMiddleware.isAuthorized, placeOrderController.placeOrder)
    .get(authMiddleware.isAuthorized, placeOrderController.getOrders)

Router.route('/order')
    .get(authMiddleware.isAuthorized, placeOrderController.getOrdersByUser)

Router.route('/:id')
    .put(authMiddleware.isAuthorized, placeOrderController.updateOrder)
    .delete(authMiddleware.isAuthorized, placeOrderController.deleteOrder)
    .get(authMiddleware.isAuthorized, placeOrderController.getOrderById)

export const placeOrderRoute = Router