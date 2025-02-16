import express from 'express'
import { vnpayController } from '~/controllers/vnpayController'

const Router = express.Router()

Router.post('/create-payment', vnpayController.createVNPayPayment)
Router.get('/vnpay_return', vnpayController.vnpayReturn)
// Trong file route
Router.get('/order-confirmation', (req, res) => {
    const { status } = req.query;
    // Render trang xác nhận thanh toán tương ứng
  });

export const vnpayRoute = Router
