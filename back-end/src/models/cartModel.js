import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// Tên collection trong database
const CART_COLLECTION_NAME = 'cart'

// Định nghĩa schema giỏ hàng
const CART_SCHEMA = Joi.object({
    customer_id: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            product_id: Joi.string().required(),
            color: Joi.string().required(), // Thêm color
            storage: Joi.string().required(), // Thêm storage
            quantity: Joi.number().integer().min(1).required(),
            unit_price: Joi.number().required(),
            total_price_per_product: Joi.number().required()
        })
    ),
    total_price: Joi.number().required(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null)
});


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

    // Lấy danh sách `product_id` từ giỏ hàng
    const productIds = cart.products.map((item) => new ObjectId(item.product_id));

    // Lấy chi tiết sản phẩm từ `products`
    const productsDetails = await db
        .collection('products')
        .find({ _id: { $in: productIds } })
        .toArray();

    // Kết hợp `name` và `image_url` từ variant
    const productsWithDetails = cart.products.map((cartItem) => {
        const productDetail = productsDetails.find(
            (product) => product._id.toString() === cartItem.product_id.toString()
        );

        // Tìm đúng variant theo `color` và `storage`
        const selectedVariant = productDetail?.variants?.find(
            (variant) => variant.color === cartItem.color && variant.storage === cartItem.storage
        );

        return {
            ...cartItem,
            name: cartItem.name || productDetail?.name || 'Sản phẩm không xác định', // ✅ Đảm bảo có name
            image_url: cartItem.image_url || selectedVariant?.images?.[0] || 'https://via.placeholder.com/50' // ✅ Đảm bảo có ảnh
        };
    });

    return {
        ...cart,
        products: productsWithDetails
    };
};




// Hàm thêm sản phẩm vào giỏ hàng
const addProductToCart = async (userId, productId, color, storage, quantity, unit_price) => {
    const db = GET_DB();
    const productIdObj = new ObjectId(productId);

    let cart = await db.collection('cart').findOne({ customer_id: userId });

    if (!cart) {
        // Nếu chưa có giỏ hàng, tạo mới
        const newCart = {
            customer_id: userId,
            products: [{
                product_id: productIdObj,
                color,
                storage,
                quantity,
                unit_price,
                total_price_per_product: unit_price * quantity
            }],
            total_price: unit_price * quantity,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await db.collection('cart').insertOne(newCart);
        return newCart;
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProductIndex = cart.products.findIndex(item =>
        item.product_id.equals(productIdObj) &&
        item.color === color &&
        item.storage === storage
    );

    if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có, tăng số lượng
        cart.products[existingProductIndex].quantity += quantity;
        cart.products[existingProductIndex].total_price_per_product =
            cart.products[existingProductIndex].quantity * cart.products[existingProductIndex].unit_price;
    } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        cart.products.push({
            product_id: productIdObj,
            color,
            storage,
            quantity,
            unit_price,
            total_price_per_product: unit_price * quantity
        });
    }

    // Cập nhật tổng giá giỏ hàng
    cart.total_price = cart.products.reduce((total, item) => total + item.total_price_per_product, 0);
    cart.updatedAt = new Date();

    await db.collection('cart').updateOne(
        { customer_id: userId },
        { $set: cart }
    );

    return cart;
};



// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
const updateProductQuantity = async (userId, productId, color, storage, quantity) => {
    const db = GET_DB();
    const productIdObj = new ObjectId(productId);

    let cart = await db.collection('cart').findOne({ customer_id: userId });

    if (!cart) throw new Error(' Giỏ hàng không tồn tại!');

    const productIndex = cart.products.findIndex(
        (item) =>
            item.product_id.equals(productIdObj) &&
            item.color === color &&
            item.storage === storage
    );

    if (productIndex === -1) throw new Error(' Không tìm thấy sản phẩm trong giỏ hàng!');

    // Cập nhật số lượng sản phẩm
    cart.products[productIndex].quantity = quantity;
    cart.products[productIndex].total_price_per_product = cart.products[productIndex].unit_price * quantity;

    // Cập nhật tổng giá trị giỏ hàng
    cart.total_price = cart.products.reduce((total, item) => total + item.total_price_per_product, 0);
    cart.updatedAt = new Date();

    await db.collection('cart').updateOne({ customer_id: userId }, { $set: cart });

    return cart;
};



// Hàm xóa sản phẩm khỏi giỏ hàng
const removeProductFromCart = async (userId, productId, color, storage) => {
    const db = GET_DB();

    try {
        // Chuyển `productId` sang ObjectId
        const productIdObj = new ObjectId(productId);
        console.log('removeProductFromCart: ', { userId, productIdObj, color, storage });

        // Tìm giỏ hàng của người dùng
        let cart = await db.collection('cart').findOne({ customer_id: userId });

        if (!cart) throw new Error(' Cart not found!');

        // Kiểm tra giỏ hàng có chứa sản phẩm cần xóa không
        const existingProduct = cart.products.find(
            (item) =>
                item.product_id.equals(productIdObj) &&
                item.color === color &&
                item.storage === storage
        );

        if (!existingProduct) throw new Error(' Product not found in cart!');

        // Lọc ra các sản phẩm còn lại (loại bỏ sản phẩm cần xóa)
        cart.products = cart.products.filter(
            (item) =>
                !(
                    item.product_id.equals(productIdObj) &&
                    item.color === color &&
                    item.storage === storage
                )
        );

        // Cập nhật tổng giá trị giỏ hàng
        cart.total_price = cart.products.reduce((total, item) => total + item.total_price_per_product, 0);
        cart.updatedAt = new Date();

        // Nếu giỏ hàng rỗng, xoá luôn giỏ hàng
        if (cart.products.length === 0) {
            await db.collection('cart').deleteOne({ customer_id: userId });
            return { message: 'Giỏ hàng trống!' };
        }

        // Cập nhật giỏ hàng trong DB
        await db.collection('cart').updateOne(
            { customer_id: userId },
            { $set: cart }
        );

        return cart;
    } catch (error) {
        console.error('Error in removeProductFromCart:', error.message);
        throw new Error('Lỗi khi xoá sản phẩm khỏi giỏ hàng!');
    }
};


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