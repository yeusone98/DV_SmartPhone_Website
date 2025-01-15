import express from 'express'
import { placeOrderController } from '~/controllers/placeOrderController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/').post(authMiddleware.isAuthorized, placeOrderController.placeOrder)

export const placeOrderRoute = Router