import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const ORDER_COLLECTION_NAME = 'orders'

// Xác thực dữ liệu đơn hàng
const ORDER_SCHEMA = Joi.object({
    customer_id: Joi.string().required(),
    orderNumber: Joi.string().required(),
    full_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    ward: Joi.string().required(),
    address_detail: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            product_id: Joi.string().required(),
            product_name: Joi.string().required(),
            image_url: Joi.string().required(),
            color: Joi.string().required(),
            storage: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required(),
            unit_price: Joi.number().required(),
            total_price_per_product: Joi.number().required()
        })
    ).required(),
    total_price: Joi.number().required(),
    payment: Joi.object({
        method: Joi.string().valid('COD', 'Banking').required(),
        transaction_id: Joi.string().allow(null),
        status: Joi.string().valid('Pending', 'Paid').required()
    }).required(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now)
})

// Xác thực dữ liệu trước khi tạo đơn hàng
const validateBeforeCreate = async (data) => {
    return await ORDER_SCHEMA.validateAsync(data, { abortEarly: false })
}

// Tạo đơn hàng trong MongoDB
const createOrder = async (data) => {
    const validData = await validateBeforeCreate(data)

    // Convert product_id strings to ObjectIds
    validData.products = validData.products.map(product => ({
        ...product,
        product_id: new ObjectId(product.product_id)
    }))

    const result = await GET_DB().collection(ORDER_COLLECTION_NAME).insertOne(validData)
    return {
        ...validData,
        _id: result.insertedId
    }
}

const findOrderById = async (id) => {
    try {
        console.log('[DEBUG] Order ID received:', id)
        if (!ObjectId.isValid(id)) {
            throw new Error(`Invalid Order ID: ${id}`)
        }

        const db = GET_DB()
        const order = await db.collection(ORDER_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })

        if (!order) {
            throw new Error('Order not found')
        }

        return order
    } catch (error) {
        console.error('[ERROR] findOrderById:', error.message)
        throw error // Giữ nguyên stack trace
    }
}

const updateOrder = async (id, updatedData) => {
    const db = GET_DB()
    const result = await db.collection(ORDER_COLLECTION_NAME).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedData }, // Sử dụng $set để merge dữ liệu
        { returnDocument: 'after' }
    )
    return result.value
}

// Trong model (placeOrderModel.js)
const deleteOrder = async (id) => {
    const db = GET_DB();
    const result = await db.collection('orders').deleteOne({ 
      _id: new ObjectId(id) 
    });
    return result;
  };

  const findAllOrders = async (query = {}) => {
    const db = GET_DB()
    const orders = await db.collection('orders').find(query).toArray()
    return orders
}

const findOrderCountByYear = async (year) => {
    const db = GET_DB()
    const count = await db.collection('orders').countDocuments({
        createdAt: { $gte: new Date(`${year}-01-01T00:00:00.000Z`), $lt: new Date(`${year + 1}-01-01T00:00:00.000Z`) }
    })
    return count
}


export const placeOrderModel = {
    createOrder,
    findOrderById,
    updateOrder,
    deleteOrder,
    findAllOrders,
    findOrderCountByYear,
}
