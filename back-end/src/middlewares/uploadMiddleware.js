import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'daa5ixim6',
    api_key: process.env.API_CLOUD_KEY,
    api_secret: process.env.API_CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'product-images', // Tên thư mục trên Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Định dạng được phép
    },
});

export const upload = multer({ storage });
