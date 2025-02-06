import { cartModel } from '~/models/cartModel'
import { StatusCodes } from 'http-status-codes'

const getCart = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const cart = await cartModel.findCartByUserId(userId)

        if (!cart) {
            return res.status(StatusCodes.OK).json({ products: [], total_price: 0 })
        }

        res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        next(error)
    }
}

const addToCart = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id;
        const { id, color, storage, unit_price, quantity } = req.body; // Thêm color và storage

        if (!id || !color || !storage || !unit_price || !quantity) {
            return res.status(400).json({ message: 'Missing required fields!' });
        }

        console.log('📌 API nhận dữ liệu:', req.body); // Debug

        const updatedCart = await cartModel.addProductToCart(userId, id, color, storage, quantity, unit_price);
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('❌ Error in addToCart:', error.message);
        next(error);
    }
};


const updateCartItem = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id;
        const { product_id, color, storage, quantity } = req.body;

        if (!product_id || !color || !storage || quantity < 1) {
            return res.status(400).json({ message: ' Thiếu thông tin sản phẩm hoặc số lượng không hợp lệ!' });
        }

        console.log(' updateCartItem received:', { userId, product_id, color, storage, quantity });

        const updatedCart = await cartModel.updateProductQuantity(userId, product_id, color, storage, quantity);

        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(' Error in updateCartItem:', error.message);
        res.status(500).json({ message: ' Không thể cập nhật số lượng sản phẩm!' });
    }
};



const removeCartItem = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id;
        const { product_id, color, storage } = req.body;

        if (!product_id || !color || !storage) {
            return res.status(400).json({ message: ' Thiếu thông tin sản phẩm cần xoá!' });
        }

        console.log(' removeCartItem received:', { userId, product_id, color, storage });

        // Gọi model để xóa sản phẩm
        const updatedCart = await cartModel.removeProductFromCart(userId, product_id, color, storage);

        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(' Error in removeCartItem:', error.message);
        res.status(500).json({ message: ' Xoá sản phẩm thất bại!' });
    }
};


export const cartController = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
}
