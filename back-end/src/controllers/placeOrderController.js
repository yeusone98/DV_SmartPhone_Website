import { placeOrderModel } from '~/models/placeOrderModel'
import { cartModel } from '~/models/cartModel'
import { StatusCodes } from 'http-status-codes'
import { productModel } from '~/models/productModel'
import { ObjectId } from 'mongodb'
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

        // Tạo mã đơn hàng
        const year = new Date().getFullYear() // Lấy năm hiện tại
        const orderCount = await placeOrderModel.findOrderCountByYear(year) // Tìm số lượng đơn hàng trong năm hiện tại
        const orderNumber = `ORD-${year}-${String(orderCount + 1).padStart(3, '0')}` // Tạo mã đơn hàng mới

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
            orderNumber, // Mã đơn hàng mới
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
                status: 'Paid'
            },
            createdAt: new Date()
        }

        // Debug log
        console.log('Dữ liệu đơn hàng:', orderData)

        // Tạo đơn hàng
        const newOrder = await placeOrderModel.createOrder(orderData)

        // Cập nhật stock cho các variant sản phẩm
        for (const product of cart.products) {
            const variantData = await productModel.findProductById(product.product_id)

            if (variantData) {
                const variantToUpdate = variantData.variants.find(v => v.storage === product.storage && v.color === product.color)
                if (variantToUpdate) {
                    // Trừ số lượng stock
                    variantToUpdate.stock -= product.quantity

                    // Cập nhật vào database
                    await productModel.updateProduct(variantData._id, {
                        variants: variantData.variants
                    })
                }
            }
        }
        // Xóa giỏ hàng sau khi đặt hàng thành công
        await cartModel.removeCart(userId)

        res.status(StatusCodes.CREATED).json({ message: 'Đặt hàng thành công!', order: newOrder })
    } catch (error) {
        console.error('Lỗi trong placeOrder:', error.message)
        next(error)
    }
}


const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { full_name, phone_number, address_detail, payment } = req.body; // Lấy payment từ body

        // Validate status
        const allowedStatuses = ['Pending', 'Paid'];
        if (payment?.status && !allowedStatuses.includes(payment.status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
        }

        const order = await placeOrderModel.findOrderById(id);
        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại!' });
        }

        // Cập nhật payment status
        const updatedPayment = {
            ...order.payment,
            status: payment?.status || order.payment.status // Sử dụng status mới nếu có
        };

        const updatedOrderData = {
            full_name,
            phone_number,
            address_detail,
            payment: updatedPayment,
            updatedAt: new Date()
        };

        const updatedOrder = await placeOrderModel.updateOrder(id, updatedOrderData);

        res.status(200).json({
            message: 'Cập nhật thành công!',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Lỗi cập nhật:', error);
        next(error);
    }
};


const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                message: 'Invalid Order ID format' 
            });
        }

        // Tìm đơn hàng
        const order = await placeOrderModel.findOrderById(id);
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ 
                message: 'Order not found!' 
            });
        }

        // Xóa đơn hàng
        const deleteResult = await placeOrderModel.deleteOrder(id);
        if (deleteResult.deletedCount === 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                message: 'Failed to delete order' 
            });
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
        const userId = req.query.userId; // Lấy userId từ query params
        let query = {};

        // Nếu có userId, thêm điều kiện lọc theo customer_id
        if (userId) {
            query.customer_id = new ObjectId(userId);
        }

        // Lấy đơn hàng với query đã lọc
        const orders = await placeOrderModel.findAllOrders(query);

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
        const userId = req.jwtDecoded._id;  // Lấy userId từ token JWT
        const orders = await placeOrderModel.findAllOrders({ customer_id: userId });  // Lọc theo customer_id

        if (!orders || orders.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Không có đơn hàng nào của bạn!' });
        }

        res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        console.error('Lỗi trong getOrdersByUser:', error.message);
        next(error);
    }
};



export const placeOrderController = {
    placeOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById,
    getOrdersByUser
}
