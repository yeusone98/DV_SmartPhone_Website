import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const PRODUCT_COLLECTION_NAME = 'products'

const PRODUCT_SCHEMA = Joi.object({
    name: Joi.string().required(),
    image_url: Joi.string().default(null),
    category_id: Joi.string().required(), // Category ID phải là ObjectId dạng string
    price: Joi.string().required(),
    stock: Joi.string().required(),
    status: Joi.string().valid('available', 'unavailable').required(),
    seller_id: Joi.string().required(), // Seller ID là user ID
    description_detail: Joi.string().required(),
    createdAt: Joi.date().timestamp().default(Date.now),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

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
    try {
        console.log('Updating Product with ObjectId:', id) // Log ID đã chuyển đổi
        delete updateData._id // Loại bỏ _id trong dữ liệu cập nhật

        const result = await GET_DB()
            .collection(PRODUCT_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: id }, // Sử dụng ObjectId đã chuyển đổi
                { $set: { ...updateData, updatedAt: Date.now() } },
                { returnDocument: 'after' } // Trả về tài liệu sau khi cập nhật
            )

        console.log('Update result:', result) // Log kết quả cập nhật
        return result.value // Trả về giá trị sản phẩm đã cập nhật
    } catch (error) {
        console.error('Error in updateProduct:', error.message)
        throw error
    }
}


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
