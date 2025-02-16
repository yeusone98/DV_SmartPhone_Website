import crypto from 'crypto'
import moment from 'moment'
import { env } from '~/config/environment'
import { placeOrderModel } from '~/models/placeOrderModel'

const createVNPayPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body

        // Kiểm tra đơn hàng tồn tại
        const order = await placeOrderModel.findOrderById(orderId)
        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' })
        }

        const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress

        const vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: env.VNP_TMN_CODE,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toán đơn hàng ${order.orderNumber}`,
            vnp_OrderType: 'billpayment',
            vnp_Amount: Math.round(amount) * 100,
            vnp_ReturnUrl: env.VNP_RETURN_URL,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: moment().format('YYYYMMDDHHmmss')
        }


        const sortedParams = sortParams(vnp_Params)

        const urlParams = new URLSearchParams()
        for (let [key, value] of Object.entries(sortedParams)) {
            urlParams.append(key, value)
        }

        const querystring = urlParams.toString()

        const hmac = crypto.createHmac('sha512', env.VNP_HASH_SECRET)
        const signed = hmac.update(querystring).digest('hex')

        urlParams.append('vnp_SecureHash', signed)

        const paymentUrl = `${env.VNP_URL}?${urlParams.toString()}`


        return res.status(200).json({ paymentUrl })
    } catch (error) {
        console.error('Lỗi tạo thanh toán VNPay:', error)
        res.status(500).json({ message: 'Không thể tạo thanh toán' })
    }
}

const vnpayReturn = async (req, res) => {
    try {
        const vnp_Params = req.query
        const secureHash = vnp_Params['vnp_SecureHash']
        delete vnp_Params['vnp_SecureHash']
        delete vnp_Params['vnp_SecureHashType']

        const sortedParams = sortParams(vnp_Params)
        const querystring = new URLSearchParams(sortedParams).toString()
        const hmac = crypto.createHmac('sha512', env.VNP_HASH_SECRET)
        const signed = hmac.update(querystring).digest('hex')

        if (secureHash === signed) {
            const orderId = vnp_Params['vnp_TxnRef']
            const responseCode = vnp_Params['vnp_ResponseCode']
            const order = await placeOrderModel.findOrderById(orderId)

            if (!order) {
                return res.redirect(`${env.WEBSITE_DOMAIN}/payment-fail?errorMessage=Đơn hàng không tồn tại`)
            }

            // Cập nhật trạng thái thanh toán
            const newStatus = responseCode === '00' ? 'Paid' : 'Failed'
            await placeOrderModel.updateOrder(orderId, {
                'payment.status': newStatus,
                'payment.transaction_id': vnp_Params['vnp_TransactionNo']
            })

            // Định dạng ngày thanh toán
            const paymentDate = new Date(order.createdAt).toLocaleString('vi-VN')

            // Xây dựng URL chuyển hướng
            if (responseCode === '00') {
                const successParams = new URLSearchParams({
                    orderId: order._id,
                    orderNumber: order.orderNumber,
                    amount: order.total_price,
                    paymentDate,
                    paymentMethod: 'VNPAY',
                    customerName: order.full_name
                })
                return res.redirect(`${env.WEBSITE_DOMAIN_DEVELOPMENT}/payment-success?${successParams}`)
            } else {
                const failParams = new URLSearchParams({
                    orderId: order._id.toString(), // Thêm orderId
                    orderNumber: order.orderNumber,
                    amount: order.total_price,
                    paymentDate,
                    customerName: order.full_name,
                    errorCode: vnp_Params['vnp_ResponseCode'] || 'UNKNOWN_ERROR',
                    errorMessage: vnp_Params['vnp_Message'] || 'Giao dịch thất bại'
                })
                return res.redirect(`${env.WEBSITE_DOMAIN_DEVELOPMENT}/payment-fail?${failParams}`)
            }
        }
        return res.redirect(`${env.WEBSITE_DOMAIN_DEVELOPMENT}/payment-fail?errorMessage=Chữ ký không hợp lệ`)
    } catch (error) {
        console.error('Lỗi xử lý phản hồi VNPay:', error)
        return res.redirect(`${env.WEBSITE_DOMAIN_DEVELOPMENT}/payment-fail?errorMessage=Lỗi hệ thống`)
    }
}
function sortParams(obj) {
    const sortedObj = Object.entries(obj)
        .filter(
            ([key, value]) => value !== '' && value !== undefined && value !== null
        )
        .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
        .reduce((acc, [key, value]) => {
            acc[key] = value
            return acc
        }, {})

    return sortedObj
}

export const vnpayController = {
    createVNPayPayment,
    vnpayReturn
}

