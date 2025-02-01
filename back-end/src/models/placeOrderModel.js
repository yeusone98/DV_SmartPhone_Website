import Joi from 'joi';
import { GET_DB } from '~/config/mongodb';

const ORDER_COLLECTION_NAME = 'orders';

const ORDER_SCHEMA = Joi.object({
    customer_id: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            product_id: Joi.string().required(),
            quantity: Joi.number().integer().required(),
            price: Joi.string().required(),
            name: Joi.string().required() // Thêm trường name
        })
    ).required(),
    total_price: Joi.string().required(),
    payment: Joi.object({
        method: Joi.string().valid('COD').required(),
        transaction_id: Joi.string().allow(null),
        status: Joi.string().valid('pending', 'paid').default('pending')
    }).required(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    ward: Joi.string().required(),
    address_detail: Joi.string().required(),
    full_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null)
});


const validateBeforeCreate = async (data) => {
    return await ORDER_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createOrder = async (data) => {
    const validData = await validateBeforeCreate(data);
    const result = await GET_DB().collection(ORDER_COLLECTION_NAME).insertOne(validData);

    // Trả về dữ liệu đơn hàng đã chèn, sử dụng insertedId
    return {
        ...validData,
        _id: result.insertedId, // Gắn thêm _id từ kết quả trả về
    };
};

export const placeOrderModel = {
    createOrder
};
