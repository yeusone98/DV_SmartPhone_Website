import express from 'express';
import { paymentController } from '~/controllers/paymentController';
import { authMiddleware } from '~/middlewares/authMiddleware';

const Router = express.Router();
//, authMiddleware.isAuthorized
Router.post('/create-payment', paymentController.createVNPayPayment)
Router.get('/vnpay_return', paymentController.vnpayReturn)

Router.get('/status', (req, res) => {
    res.status(200).json({ message: 'Payment APIs are ready to use.' })

})

export const paymentRoute = Router;
