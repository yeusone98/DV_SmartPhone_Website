import { productModel } from '~/models/productModel'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'

const createProduct = async (req, res, next) => {
    try {
        const { files, body } = req
        let data = { ...body, seller_id: req.jwtDecoded._id }

        const mainImages = files
            .filter(file => file.fieldname === 'images')
            .map(file => file.path)
        data.image_urls = mainImages


        // Parse JSON cho variants nếu cần
        if (typeof data.variants === 'string') {
            try {
                data.variants = JSON.parse(data.variants)
            } catch (error) {
                console.error('Error parsing variants:', error)
                data.variants = []
            }
        }
        if (!Array.isArray(data.variants)) data.variants = []

        // Xử lý ảnh chính
        if (files?.images) {
            data.image_urls = files.images.map(file => file.path)
        }

        // Xử lý ảnh variants
        const variantImagesMap = {} // Lưu ảnh theo index của variant
        files?.forEach((file) => {
            const match = file.fieldname.match(/variants\[(\d+)\]\[images\]/)
            if (match) {
                const variantIndex = parseInt(match[1], 10)
                if (!variantImagesMap[variantIndex]) {
                    variantImagesMap[variantIndex] = []
                }
                variantImagesMap[variantIndex].push(file.path)
            }
        })

        // Gán ảnh vào từng variant
        data.variants.forEach((variant, index) => {
            variant.images = variantImagesMap[index] || []
        })

        if (body.same_specifications) {
            try {
                data.same_specifications = JSON.parse(body.same_specifications)
            } catch (error) {
                console.error('Error parsing same_specifications:', error)
                data.same_specifications = []
            }
        }

        // Tạo sản phẩm
        const result = await productModel.createProduct(data)
        res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
        next(error)
    }
}


const getProducts = async (req, res, next) => {
    try {
        const { search, status } = req.query
        const query = { _destroy: false }

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
        const { id } = req.params
        const { body, files } = req // files lấy từ req.files do upload.any()
        const objectId = new ObjectId(id)

        const existingProduct = await productModel.findProductById(objectId)
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found!' })
        }

        // Xử lý ảnh chính từ files
        const keptImages = JSON.parse(body.image_urls || '[]')
        const newMainImages = files
            .filter(file => file.fieldname === 'images')
            .map(file => file.path)
        const updatedMainImages = [...keptImages, ...newMainImages]

        // Xử lý variants từ body và files
        let variantsData = []
        try {
            variantsData = JSON.parse(body.variants || '[]')
        } catch (error) {
            return res.status(400).json({ message: 'Invalid variants data!' })
        }

        // Tạo map cho ảnh variants mới
        const variantImagesMap = {}
        files.forEach((file) => {
            const match = file.fieldname.match(/variants\[(\d+)\]\[images\]/)
            if (match) {
                const variantIndex = parseInt(match[1], 10)
                if (!variantImagesMap[variantIndex]) {
                    variantImagesMap[variantIndex] = []
                }
                variantImagesMap[variantIndex].push(file.path)
            }
        })

        // Cập nhật ảnh cho từng variant
        const updatedVariants = variantsData.map((variant, index) => {
            const existingVariant = existingProduct.variants[index] || {}
            const existingImages = variant.images?.filter(img => typeof img === 'string') || []
            const newImages = variantImagesMap[index] || []
            return {
                ...variant,
                images: [...existingImages, ...newImages]
            }
        })

        // Chuẩn bị dữ liệu cập nhật
        const updateData = {
            ...body,
            image_urls: updatedMainImages,
            variants: updatedVariants,
            updatedAt: new Date()
        }

        if (body.same_specifications) {
            try {
                updateData.same_specifications = JSON.parse(body.same_specifications)
            } catch (error) {
                console.error('Error parsing same_specifications:', error)
                updateData.same_specifications = []
            }
        }

        const result = await productModel.updateProduct(objectId, updateData)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = req.jwtDecoded // Lấy thông tin user từ JWT

        // Tìm sản phẩm theo ID
        const product = await productModel.findProductById(id)

        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found!' })
        }

        // Nếu user không phải admin và không phải seller, chặn quyền xóa
        if (user.role !== 'admin' && product.seller_id !== user._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not allowed!' })
        }

        // Thực hiện xóa sản phẩm
        const result = await productModel.deleteProduct(id)

        if (result) {
            res.status(StatusCodes.OK).json({ message: 'Product deleted successfully!' })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found!' })
        }
    } catch (error) {
        console.error('Error in deleteProduct:', error.message)
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