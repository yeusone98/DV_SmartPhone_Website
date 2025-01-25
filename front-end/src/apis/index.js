import authorizedAxiosInstance from '../utils/authorizeAxios';
import { API_ROOT } from '../utils/constants';
import { message } from 'antd'; // Sử dụng message của Ant Design

/** Users */
export const registerUserAPI = async (data) => {
    try {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data);
        message.success('Account created successfully! Please check and verify your account before logging in!');
        return response.data;
    } catch (error) {
        message.error(error.response?.data?.message || 'Failed to register user. Please try again.');
        throw error;
    }
};

export const verifyUserAPI = async (data) => {
    try {
        const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data);
        message.success('Account verified successfully!');
        return response.data;
    } catch (error) {
        message.error(error.response?.data?.message || 'Failed to verify user. Please try again.');
        throw error;
    }
};

export const logoutUserAPI = async () => {
    try {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/logout`);
        message.success('Logged out successfully!');
        return response.data;
    } catch (error) {
        message.error('Failed to log out. Please try again.');
        throw error;
    }
};

/** Refresh Token API */
export const refreshTokenAPI = async () => {
    try {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/refresh-token`);
        return response.data;
    } catch (error) {
        message.error('Failed to refresh token.');
        throw error;
    }
};

export const sendResetPasswordEmailAPI = async (data) => {
    try {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/forgot-password`, data);
        message.success('Reset password email sent successfully!');
        return response.data;
    } catch (error) {
        message.error(error.response?.data?.message || 'Failed to send reset password email.');
        throw error;
    }
};

export const resetPasswordAPI = async (data) => {
    try {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/reset-password`, data);
        message.success('Password reset successfully!');
        return response.data;
    } catch (error) {
        message.error(error.response?.data?.message || 'Failed to reset password.');
        throw error;
    }
};

// Product
export const fetchProductsAPI = async (query) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/products`, { params: query });
    return response.data;
};

export const createProductAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/products`, data);
    return response.data;
};

export const updateProductAPI = async (id, formData) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/products/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const fetchProductByIdAPI = async (id) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/products/${id}`);
    return response.data;
};

export const deleteProductAPI = async (id) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/products/${id}`);
    return response.data;
};

// Cart
export const addToCartAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cart`, {
        id: data.id,
        price: data.price,
        quantity: data.quantity,
    });
    return response.data;
};

export const updateCartItemAPI = async ({ product_id, quantity }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cart`, {
        product_id,
        quantity,
    });
    return response.data;
};

export const fetchCartAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cart`);
    return response.data;
};

export const removeCartItemAPI = async (productId) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/cart`, {
        data: { product_id: productId },
    });
    return response.data;
};

export const placeOrderAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/orders`, data);
    return response.data;
};

// Lấy danh sách review của sản phẩm
export const fetchReviewsAPI = async (productId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/reviews/${productId}`);
    return response.data;
};

// Thêm review mới
export const createReviewAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/reviews`, data);
    return response.data;
};

// Xóa review
export const deleteReviewAPI = async (reviewId) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/reviews/${reviewId}`);
    return response.data;
};

// Thêm reply cho review
export const addReplyAPI = async (reviewId, replyData) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/reviews/${reviewId}/reply`, replyData);
    return response.data;
};
