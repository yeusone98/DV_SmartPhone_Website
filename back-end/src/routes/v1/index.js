import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from '~/routes/v1/userRoute'
import { productRoute } from '~/routes/v1/productRoute'
import { cartRoute } from '~/routes/v1/cartRoute'
import { placeOrderRoute } from '~/routes/v1/placeOrderRoute'
import { reviewRoute } from '~/routes/v1/reviewRoute'
import { dashboardRoute } from '~/routes/v1/dashboardRoute'
import { vnpayRoute } from '~/routes/v1/vnpayRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

/* User APIs */

Router.use('/users', userRoute)

/* Product APIs */
Router.use('/products', productRoute)

/* Cart APIs */
Router.use('/cart', cartRoute)


/* Order APIs */

Router.use('/orders', placeOrderRoute)

/* Review APIs */

Router.use('/reviews', reviewRoute)

/* Dashboard APIs */

Router.use('/dashboard', dashboardRoute)

/* Vnpay APIs */
Router.use('/vnpay', vnpayRoute)

export const APIs_V1 = Router