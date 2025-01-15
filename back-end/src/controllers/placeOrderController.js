import { placeOrderModel } from '~/models/placeOrderModel'
import { cartModel } from '~/models/cartModel'
import { productModel } from '~/models/productModel'
import { StatusCodes } from 'http-status-codes'

const placeOrder = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id // Lấy ID người dùng từ token
        const { province, district, ward, address_detail, full_name, phone_number } = req.body // Lấy thêm full_name và phone_number

        if (!province || !district || !ward || !address_detail || !full_name || !phone_number) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields!' })
        }

        // Lấy giỏ hàng của người dùng
        const cart = await cartModel.findCartByUserId(userId)
        if (!cart || !cart.products || cart.products.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Cart is empty!' })
        }

        // Lấy thông tin danh mục (giả sử chỉ lấy danh mục của sản phẩm đầu tiên)
        const firstProduct = cart.products[0]
        const product = await productModel.findProductById(firstProduct.product_id)
        if (!product || !product.category_id) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Category not found for the product!' })
        }

        // Chuẩn bị dữ liệu đơn hàng
        const orderData = {
            customer_id: userId,
            category_id: product.category_id,
            products: cart.products,
            total_price: cart.total_price,
            payment: {
                method: 'COD',
                transaction_id: null,
                status: 'pending'
            },
            province,
            district,
            ward,
            address_detail,
            full_name, // Thêm họ tên
            phone_number // Thêm số điện thoại
        }

        // Tạo đơn hàng
        const newOrder = await placeOrderModel.createOrder(orderData)

        // Xóa giỏ hàng sau khi đặt hàng thành công
        await cartModel.removeCart(userId)

        res.status(StatusCodes.CREATED).json({ message: 'Order placed successfully!', order: newOrder })
    } catch (error) {
        console.error('Error in placeOrder:', error.message)
        next(error)
    }
}


export const placeOrderController = {
    placeOrder
}
