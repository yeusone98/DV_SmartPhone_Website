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
        const userId = req.jwtDecoded._id // Lấy ID người dùng từ token
        const { id, price, quantity } = req.body // Lấy dữ liệu từ request body

        // Kiểm tra các trường bắt buộc
        if (!id || !price || !quantity) {
            return res.status(400).json({ message: 'Missing required fields!' })
        }

        // Gọi model để thêm sản phẩm vào giỏ hàng
        const updatedCart = await cartModel.addProductToCart(userId, id, quantity, price)

        res.status(200).json(updatedCart)
    } catch (error) {
        console.error('Error in addToCart:', error.message)
        next(error)
    }
}


const updateCartItem = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const { product_id, quantity } = req.body

        if (!product_id || quantity < 1) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing or invalid product_id or quantity!' })
        }

        const updatedCart = await cartModel.updateProductQuantity(userId, product_id, quantity)

        res.status(StatusCodes.OK).json(updatedCart)
    } catch (error) {
        console.error('Error in updateCartItem:', error.message)
        next(error)
    }
}


const removeCartItem = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id // Lấy customer_id từ token
        const { product_id } = req.body

        if (!product_id) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing product_id!' })
        }

        // Gọi hàm model để xóa sản phẩm
        const updatedCart = await cartModel.removeProductFromCart(userId, product_id)

        res.status(StatusCodes.OK).json(updatedCart)
    } catch (error) {
        console.error('Error in removeCartItem:', error.message)
        next(error)
    }
}


export const cartController = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
}
