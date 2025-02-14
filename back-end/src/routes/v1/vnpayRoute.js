import express from 'express';
import { vnpayController } from '~/controllers/vnpayController'
import { authMiddleware } from '~/middlewares/authMiddleware';

const Router = express.Router();
//, authMiddleware.isAuthorized
Router.post('/create-payment', vnpayController.createVNPayPayment)
Router.get('/vnpay_return', vnpayController.vnpayReturn)

Router.get('/status', (req, res) => {
    res.status(200).json({ message: 'Payment APIs are ready to use.' })

})

export const vnpayRoute = Router;
