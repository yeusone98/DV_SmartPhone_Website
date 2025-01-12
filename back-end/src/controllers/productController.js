import { productModel } from '~/models/productModel'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb';
const createProduct = async (req, res, next) => {
    try {
        const { file } = req
        console.log('File uploaded:', file) // Log file để kiểm tra
        const data = { ...req.body, seller_id: req.jwtDecoded._id }

        if (file) {
            data.image_url = file.path // URL của ảnh từ Cloudinary
        }

        console.log('Product data:', data) // Log dữ liệu sản phẩm
        const result = await productModel.createProduct(data)
        res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
        console.error('Error in createProduct:', error.message) // Log lỗi
        next(error)
    }
}


const getProducts = async (req, res, next) => {
    try {
        const { category_id, search, status } = req.query
        const query = { _destroy: false }
        if (category_id) query.category_id = category_id
        if (status) query.status = status
        if (search) query.name = { $regex: search, $options: 'i' }

        const results = await productModel.findProducts(query)
        res.status(StatusCodes.OK).json(results)
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await productModel.findProductById(id)
        if (!result) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found!' })
        }
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}


const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log('Product ID received from params:', id); // Log ID từ params

        const data = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Product ID is missing in the request URL' });
        }

        // Nếu có file, thêm URL hình ảnh vào dữ liệu
        if (req.file) {
            data.image_url = req.file.path;
        }

        const objectId = new ObjectId(id); // Chuyển `id` sang ObjectId
        console.log('Converted ObjectId:', objectId)

        const updatedProduct = await productModel.updateProduct(objectId, data)

        res.status(200).json(updatedProduct)
    } catch (error) {
        console.error('Error updating product:', error)
        next(error)
    }
};

  
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const sellerId = req.jwtDecoded._id // Lấy seller_id từ JWT
        const product = await productModel.findProductById(id)

        if (!product || product.seller_id !== sellerId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not allowed!' })
        }

        const result = await productModel.deleteProduct(id)

        if (result) {
            res.status(StatusCodes.OK).json({ message: 'Product deleted successfully!' })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found!' })
        }
    } catch (error) {
        next(error)
    }
}

export const productController = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}