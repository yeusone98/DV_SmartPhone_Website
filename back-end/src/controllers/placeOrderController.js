import { placeOrderModel } from '~/models/placeOrderModel'
import { cartModel } from '~/models/cartModel'
import { StatusCodes } from 'http-status-codes'
import { productModel } from '~/models/productModel'
import { ObjectId } from 'mongodb'
const placeOrder = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const {
            province,
            district,
            ward,
            address_detail,
            full_name,
            phone_number,
            paymentMethod,
            products // Thêm trường products từ request body
        } = req.body

        // Kiểm tra thông tin bắt buộc
        if (!province || !district || !ward || !address_detail || !full_name || !phone_number || !paymentMethod) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Thiếu thông tin bắt buộc!' })
        }

        let orderProducts = []
        let total_price = 0

        // Kiểm tra phương thức thanh toán hợp lệ
        if (!['COD', 'Banking', 'VNPAY'].includes(paymentMethod)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Phương thức thanh toán không hợp lệ!' })
        }

        // Xử lý 2 trường hợp: Mua ngay (có products) hoặc Mua từ giỏ hàng
        if (products && products.length > 0) {
            // Trường hợp MUA NGAY
            orderProducts = products.map(product => ({
                product_id: product.product_id,
                product_name: product.product_name,
                image_url: product.image_url,
                color: product.color,
                storage: product.storage,
                quantity: product.quantity,
                unit_price: product.unit_price,
                total_price_per_product: product.quantity * product.unit_price
            }))

            total_price = orderProducts.reduce((sum, item) => sum + item.total_price_per_product, 0)
        } else {
            const cart = await cartModel.findCartByUserId(userId)

            // Kiểm tra giỏ hàng chỉ khi mua từ giỏ hàng
            if (!cart || !cart.products || cart.products.length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Giỏ hàng trống!' })
            }

            orderProducts = cart.products.map((cartItem) => ({
                product_id: cartItem.product_id.toString(),
                product_name: cartItem.product_name,
                image_url: cartItem.image_url,
                color: cartItem.color,
                storage: cartItem.storage,
                quantity: cartItem.quantity,
                unit_price: cartItem.unit_price,
                total_price_per_product: cartItem.quantity * cartItem.unit_price
            }))

            total_price = orderProducts.reduce((sum, item) => sum + item.total_price_per_product, 0)
        }

        // Trạng thái thanh toán ban đầu
        const initialPaymentStatus = paymentMethod === 'VNPAY' ? 'Pending' : 'Paid'

        const orderData = {
            customer_id: userId,
            orderNumber: `ORD-${new Date().getFullYear()}-${String(await placeOrderModel.findOrderCountByYear(new Date().getFullYear()) + 1).padStart(3, '0')}`,
            full_name,
            phone_number,
            province,
            district,
            ward,
            address_detail,
            products: orderProducts,
            total_price,
            payment: {
                method: paymentMethod,
                transaction_id: null,
                status: initialPaymentStatus
            },
            createdAt: new Date()
        }

        // Kiểm tra tồn kho và cập nhật
        for (const product of orderProducts) {
            const productData = await productModel.findProductById(product.product_id)
            if (productData) {
                const variantToUpdate = productData.variants.find(v =>
                    v.storage === product.storage &&
                    v.color === product.color
                )
                if (variantToUpdate) {
                    if (variantToUpdate.stock < product.quantity) {
                        return res.status(StatusCodes.BAD_REQUEST).json({
                            message: `Sản phẩm ${product.product_name} - ${product.color} - ${product.storage}GB không đủ hàng`
                        })
                    }
                    variantToUpdate.stock -= product.quantity
                    await productModel.updateProduct(productData._id, { variants: productData.variants })
                }
            }
        }

        // Tạo đơn hàng
        const newOrder = await placeOrderModel.createOrder(orderData)

        // Chỉ xóa giỏ hàng khi mua từ giỏ hàng
        if (!products) {
            await cartModel.removeCart(userId)
        }

        res.status(StatusCodes.CREATED).json({
            message: 'Đặt hàng thành công!',
            order: newOrder
        })

    } catch (error) {
        console.error('Lỗi trong placeOrder:', error.message)
        next(error)
    }
}


const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        const { full_name, phone_number, address_detail, payment } = req.body // Lấy payment từ body

        // Validate status
        const allowedStatuses = ['Pending', 'Paid', 'Failed', 'Confirmed', 'Completed', 'Cancel']
        if (payment?.status && !allowedStatuses.includes(payment.status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ' })
        }

        const order = await placeOrderModel.findOrderById(id)
        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại!' })
        }

        // Cập nhật payment status
        const updatedPayment = {
            ...order.payment,
            status: payment?.status || order.payment.status // Sử dụng status mới nếu có
        }

        const updatedOrderData = {
            full_name,
            phone_number,
            address_detail,
            payment: updatedPayment,
            updatedAt: new Date()
        }

        const updatedOrder = await placeOrderModel.updateOrder(id, updatedOrderData)

        res.status(200).json({
            message: 'Cập nhật thành công!',
            order: updatedOrder
        })
    } catch (error) {
        console.error('Lỗi cập nhật:', error)
        next(error)
    }
}


const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params

        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid Order ID format'
            })
        }

        // Tìm đơn hàng
        const order = await placeOrderModel.findOrderById(id)
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Order not found!'
            })
        }

        // Xóa đơn hàng
        const deleteResult = await placeOrderModel.deleteOrder(id)
        if (deleteResult.deletedCount === 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to delete order'
            })
        }

        // Nếu cần, bạn có thể phục hồi lại stock cho các sản phẩm đã bị trừ (giống như trong updateOrder)
        for (const product of order.products) {
            const variantData = await productModel.findProductById(product.product_id)

            if (variantData) {
                const variantToUpdate = variantData.variants.find(v => v.storage === product.storage && v.color === product.color)
                if (variantToUpdate) {
                    // Khôi phục lại stock
                    variantToUpdate.stock += product.quantity

                    // Cập nhật lại vào database
                    await productModel.updateProduct(variantData._id, {
                        variants: variantData.variants
                    })
                }
            }
        }

        res.status(StatusCodes.OK).json({ message: 'Đơn hàng đã được xóa thành công!' })
    } catch (error) {
        console.error('Lỗi trong xóa đơn hàng:', error.message)
        next(error)
    }
}

// placeOrderController.js

const getOrders = async (req, res, next) => {
    try {
        const userId = req.query.userId // Lấy userId từ query params
        let query = {}

        // Nếu có userId, thêm điều kiện lọc theo customer_id
        if (userId) {
            query.customer_id = new ObjectId(userId)
        }

        // Lấy đơn hàng với query đã lọc
        const orders = await placeOrderModel.findAllOrders(query)

        if (!orders || orders.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Không có đơn hàng nào!' })
        }

        res.status(StatusCodes.OK).json(orders)
    } catch (error) {
        console.error('Lỗi trong getOrders:', error.message)
        next(error)
    }
}

// Trong file controller (placeOrderController.js)
const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params // Đổi từ id thành id
        if (!ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid Order ID format',
                error: `Received invalid ID: ${id}`
            })
        }

        const order = await placeOrderModel.findOrderById(id)
        res.status(StatusCodes.OK).json(order)
    } catch (error) {
        console.error('Lỗi trong getOrderById:', error.message)
        next(error)
    }
}

const getOrdersByUser = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id // Lấy userId từ token JWT
        const orders = await placeOrderModel.findAllOrders({ customer_id: userId }) // Lọc theo customer_id

        if (!orders || orders.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Không có đơn hàng nào của bạn!' })
        }

        res.status(StatusCodes.OK).json(orders)
    } catch (error) {
        console.error('Lỗi trong getOrdersByUser:', error.message)
        next(error)
    }
}


export const placeOrderController = {
    placeOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById,
    getOrdersByUser
}
