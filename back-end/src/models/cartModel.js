import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// Tên collection trong database
const CART_COLLECTION_NAME = 'cart'

// Định nghĩa schema giỏ hàng
const CART_SCHEMA = Joi.object({
    customer_id: Joi.string().required(), // ID của người dùng, dạng string (ObjectId)
    products: Joi.array().items(
        Joi.object({
            product_id: Joi.string().required(), // ID của sản phẩm, dạng string (ObjectId)
            quantity: Joi.number().integer().min(1).required(), // Số lượng sản phẩm, tối thiểu là 1
            price: Joi.string().required() // Giá của sản phẩm (dạng string để khớp với hệ thống)
        })
    ),
    total_price: Joi.string().required(), // Tổng giá của giỏ hàng, dạng string
    createdAt: Joi.date().timestamp('javascript').default(Date.now), // Thời gian tạo
    updatedAt: Joi.date().timestamp('javascript').default(null) // Thời gian cập nhật
})

// Hàm validate dữ liệu trước khi tạo giỏ hàng
const validateBeforeCreate = async (data) => {
    return await CART_SCHEMA.validateAsync(data, { abortEarly: false })
}

// Hàm tạo giỏ hàng mới
const createCart = async (data) => {
    const validData = await validateBeforeCreate({
        ...data,
        customer_id: data.customer_id.toString() // Lưu customer_id dưới dạng string
    })
    const result = await GET_DB().collection(CART_COLLECTION_NAME).insertOne(validData)
    return result.ops[0] // Trả về giỏ hàng mới tạo
}

// Hàm tìm giỏ hàng của người dùng theo customer_id
const findCartByUserId = async (userId) => {
    const db = GET_DB();
    const cart = await db.collection(CART_COLLECTION_NAME).findOne({ customer_id: userId });

    if (!cart) return null;

    // Lấy thông tin chi tiết sản phẩm từ collection `products`
    const productIds = cart.products.map((item) => new ObjectId(item.product_id)); // Chuyển các `product_id` thành ObjectId
    const productsDetails = await db
        .collection('products')
        .find({ _id: { $in: productIds } })
        .toArray();

    // Kết hợp `name` từ `products` vào `cart.products`
    const productsWithName = cart.products.map((cartItem) => {
        const productDetail = productsDetails.find(
            (product) => product._id.toString() === cartItem.product_id
        );
        return {
            ...cartItem,
            name: productDetail?.name || 'Unknown Product', // Nếu không tìm thấy, đặt tên mặc định
        };
    });

    return {
        ...cart,
        products: productsWithName, // Cập nhật danh sách sản phẩm với tên
    };
};



// Hàm thêm sản phẩm vào giỏ hàng
const addProductToCart = async (userId, productId, quantity, price) => {
    const db = GET_DB()

    const cart = await db.collection(CART_COLLECTION_NAME).findOne({ customer_id: userId })

    if (!cart) {
        // Tạo giỏ hàng mới nếu chưa tồn tại
        const newCart = {
            customer_id: userId, // Lưu customer_id dưới dạng string
            products: [{ product_id: productId, quantity, price }],
            total_price: (parseFloat(price) * quantity).toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.collection(CART_COLLECTION_NAME).insertOne(newCart)
        return newCart
    }

    // Nếu giỏ hàng đã tồn tại, kiểm tra sản phẩm
    const existingProduct = cart.products.find((item) => item.product_id === productId)

    if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingProduct.quantity += quantity
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới
        cart.products.push({ product_id: productId, quantity, price })
    }

    // Tính lại tổng giá
    cart.total_price = cart.products
        .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
        .toString()
    cart.updatedAt = new Date()

    // Cập nhật giỏ hàng trong database
    await db.collection(CART_COLLECTION_NAME).updateOne({ customer_id: userId }, { $set: cart })

    return cart
}


// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
const updateProductQuantity = async (userId, productId, quantity) => {
    const db = GET_DB()

    const cart = await db.collection(CART_COLLECTION_NAME).findOne({ customer_id: userId })

    if (!cart) throw new Error('Cart not found!')

    const product = cart.products.find((item) => item.product_id === productId)

    if (!product) throw new Error('Product not found in cart!')

    // Cập nhật số lượng sản phẩm
    product.quantity = quantity

    // Tính lại tổng giá tiền
    cart.total_price = cart.products
        .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
        .toString()

    cart.updatedAt = new Date()

    // Cập nhật giỏ hàng trong database
    await db.collection(CART_COLLECTION_NAME).updateOne({ customer_id: userId }, { $set: cart })

    return cart
}


// Hàm xóa sản phẩm khỏi giỏ hàng
const removeProductFromCart = async (userId, productId) => {
    const db = GET_DB()

    // Tìm giỏ hàng theo customer_id (loại bỏ new ObjectId nếu customer_id là string)
    const cart = await db.collection(CART_COLLECTION_NAME).findOne({ customer_id: userId })

    if (!cart) throw new Error('Cart not found!')

    // Lọc bỏ sản phẩm khỏi giỏ hàng
    cart.products = cart.products.filter((item) => item.product_id !== productId)

    // Cập nhật lại tổng giá
    cart.total_price = cart.products.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    ).toString()

    cart.updatedAt = new Date()

    // Cập nhật giỏ hàng trong database
    await db.collection(CART_COLLECTION_NAME).updateOne({ customer_id: userId }, { $set: cart })

    return cart
}

const removeCart = async (userId) => {
    const db = GET_DB()
    await db.collection(CART_COLLECTION_NAME).deleteOne({ customer_id: userId })
}


export const cartModel = {
    createCart,
    findCartByUserId,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    removeCart
}