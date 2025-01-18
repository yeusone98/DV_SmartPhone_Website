import { placeOrderModel } from '~/models/placeOrderModel'
import { cartModel } from '~/models/cartModel'
import { productModel } from '~/models/productModel'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const placeOrder = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id; // Lấy ID người dùng từ token
        const { province, district, ward, address_detail, full_name, phone_number } = req.body;

        // Kiểm tra các trường thông tin
        if (!province || !district || !ward || !address_detail || !full_name || !phone_number) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields!' });
        }

        // Lấy giỏ hàng từ database
        const cart = await cartModel.findCartByUserId(userId);
        if (!cart || !cart.products || cart.products.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Cart is empty!' });
        }

        // Lấy danh sách product_id từ giỏ hàng
        const productIds = cart.products.map((item) => new ObjectId(item.product_id));

        // Lấy thông tin sản phẩm từ collection `products`
        const db = GET_DB();
        const productsDetails = await db
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray();

        // Gắn tên sản phẩm vào từng mục trong giỏ hàng
        const productsWithName = cart.products.map((cartItem) => {
            const productDetail = productsDetails.find(
                (product) => product._id.toString() === cartItem.product_id
            );
            return {
                ...cartItem,
                name: productDetail?.name || 'Unknown Product'
            };
        });

        // Chuẩn bị dữ liệu đơn hàng
        const orderData = {
            customer_id: userId,
            products: productsWithName, // Gắn danh sách sản phẩm có tên
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
            full_name,
            phone_number,
            createdAt: new Date()
        };

        // Debug log
        console.log('Order data to validate:', orderData);

        // Tạo đơn hàng
        const newOrder = await placeOrderModel.createOrder(orderData);

        // Xóa giỏ hàng sau khi đặt hàng thành công
        await cartModel.removeCart(userId);

        res.status(StatusCodes.CREATED).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (error) {
        console.error('Error in placeOrder:', error.message);
        next(error);
    }
};


export const placeOrderController = {
    placeOrder
}
