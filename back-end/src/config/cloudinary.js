import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'daa5ixim6',
    api_key: process.env.API_CLOUD_KEY,
    api_secret: process.env.API_CLOUD_SECRET,
});

cloudinary.api.ping((error, result) => {
    if (error) {
        console.error('Cloudinary connection failed:', error.message);
    } else {
        console.log('Cloudinary connection successful:', result);
    }
});

export default cloudinary;
