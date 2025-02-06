import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const PRODUCT_COLLECTION_NAME = 'products'

const PRODUCT_SCHEMA = Joi.object({
    name: Joi.string().required(),
    image_urls: Joi.array().items(Joi.string()).default([]),
    category_id: Joi.string().required(),
    status: Joi.string().valid('available', 'unavailable').required(),
    seller_id: Joi.string().required(),
    description_detail: Joi.string().required(),
    technical_specifications: Joi.string().required(),
    youtube_link: Joi.string().uri().allow(null).default(null),
    variants: Joi.array().items(
        Joi.object({
            storage: Joi.string().required(),  // Dung lượng (String is okay for storage)
            color: Joi.string().required(),    // Màu sắc (String is okay for color)
            price: Joi.number().required(),    // Giá của phiên bản (Price should be a number)
            price_discount: Joi.number().allow(null).default(null),  // Giá khuyến mãi (Price discount should be a number)
            stock: Joi.number().integer().min(0).required(),  // Số lượng hàng
            images: Joi.array().items(Joi.string()).default([]),  // Hình ảnh của phiên bản
        })
    ).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
});

const validateBeforeCreate = async (data) => {
    return await PRODUCT_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createProduct = async (data) => {
    const validData = await validateBeforeCreate(data)
    const result = await GET_DB()
        .collection(PRODUCT_COLLECTION_NAME)
        .insertOne(validData)
    return result
}

const findProducts = async (query = {}, options = {}) => {
    const results = await GET_DB()
        .collection(PRODUCT_COLLECTION_NAME)
        .find(query, options)
        .toArray()
    return results
}

const findProductById = async (id) => {
    const result = await GET_DB()
        .collection(PRODUCT_COLLECTION_NAME)
        .findOne({ _id: new ObjectId(id) })
    return result
}

const updateProduct = async (id, updateData) => {
    if (typeof id === 'string') {
        id = new ObjectId(id)
    }
    const result = await GET_DB()
        .collection(PRODUCT_COLLECTION_NAME)
        .findOneAndUpdate(
            { _id: id },
            { $set: updateData },
            { returnDocument: 'after' }
        )
    return result.value
};

const deleteProduct = async (id) => {
    const result = await GET_DB()
        .collection(PRODUCT_COLLECTION_NAME)
        .deleteOne({ _id: new ObjectId(id) }) // Sử dụng `deleteOne` để xóa hoàn toàn
    return result.deletedCount > 0 // Trả về true nếu xóa thành công
}

export const productModel = {
    createProduct,
    findProducts,
    findProductById,
    updateProduct,
    deleteProduct
}
