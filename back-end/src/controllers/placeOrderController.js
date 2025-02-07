import { placeOrderModel } from '~/models/placeOrderModel'
import { cartModel } from '~/models/cartModel'
import { StatusCodes } from 'http-status-codes'

const placeOrder = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id // Lấy ID người dùng từ token
        const { province, district, ward, address_detail, full_name, phone_number, paymentMethod } = req.body

        // Kiểm tra thông tin bắt buộc
        if (!province || !district || !ward || !address_detail || !full_name || !phone_number || !paymentMethod) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Thiếu thông tin bắt buộc!' })
        }

        // Kiểm tra phương thức thanh toán hợp lệ
        if (!['COD', 'Banking'].includes(paymentMethod)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Phương thức thanh toán không hợp lệ!' })
        }

        // Lấy giỏ hàng từ database
        const cart = await cartModel.findCartByUserId(userId)
        if (!cart || !cart.products || cart.products.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Giỏ hàng trống!' })
        }

        // Gắn thông tin sản phẩm vào từng mục trong giỏ hàng (cart.products đã chứa đủ thông tin)
        const productsWithName = cart.products.map((cartItem) => {
            return {
                product_id: cartItem.product_id.toString(),
                product_name: cartItem.product_name,
                image_url: cartItem.image_url,
                color: cartItem.color,
                storage: cartItem.storage,
                quantity: cartItem.quantity,
                unit_price: cartItem.unit_price,
                total_price_per_product: cartItem.quantity * cartItem.unit_price
            }
        })

        // Tính tổng tiền đơn hàng
        const total_price = productsWithName.reduce((sum, item) => sum + item.total_price_per_product, 0)

        // Chuẩn bị dữ liệu đơn hàng
        const orderData = {
            customer_id: userId,
            full_name,
            phone_number,
            province,
            district,
            ward,
            address_detail,
            products: productsWithName, // Danh sách sản phẩm đã có tên
            total_price,
            payment: {
                method: paymentMethod, // Lưu COD hoặc Banking
                transaction_id: null, // Banking có thể cập nhật transaction sau
                status: 'pending'
            },
            createdAt: new Date(),
        }

        // Debug log
        console.log('Dữ liệu đơn hàng:', orderData)

        // Tạo đơn hàng
        const newOrder = await placeOrderModel.createOrder(orderData)

        // Xóa giỏ hàng sau khi đặt hàng thành công
        await cartModel.removeCart(userId)

        res.status(StatusCodes.CREATED).json({ message: 'Đặt hàng thành công!', order: newOrder })
    } catch (error) {
        console.error('Lỗi trong placeOrder:', error.message)
        next(error)
    }
}

export const placeOrderController = {
    placeOrder
}
