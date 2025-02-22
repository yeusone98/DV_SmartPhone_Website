import authorizedAxiosInstance from '../utils/authorizeAxios';
import { API_ROOT } from '../utils/constants';
import { message } from 'antd'; // Sử dụng message của Ant Design

/** Users */

export const fetchCustomersAPI = async () => {
    try {
        const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/`);
        return response.data;
    } catch (error) {
        message.error('Failed to fetch customers. Please try again.');
        throw error;
    }
};

export const updateCustomerAPI = async (id, data) => {
    try {
        const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/${id}`, data);
        message.success('Customer updated successfully!');
        return response.data;
    } catch (error) {
        message.error('Failed to update customer. Please try again.');
        throw error;
    }
};

export const deleteCustomerAPI = async (id) => {
    try {
        const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/${id}`);
        message.success('Customer deleted successfully!');
        return response.data;
    } catch (error) {
        message.error('Failed to delete customer. Please try again.');
        throw error;
    }
};


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
      color: data.color, 
      storage: String(data.storage), 
      unit_price: Number(data.unit_price), 
      quantity: Number(data.quantity), 
      total_price_per_product: Number(data.unit_price) * Number(data.quantity) 
    });

    return response.data;
};


export const updateCartItemAPI = async ({ product_id, color, storage, quantity }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cart`, {
        product_id,
        color,
        storage,
        quantity
    });
    return response.data;
};

export const fetchCartAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cart`);
    return response.data;
};

export const removeCartItemAPI = async ({ product_id, color, storage }) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/cart`, {
        data: { product_id, color, storage }
    });
    return response.data;
};

// Đặt hàng
export const placeOrderAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/orders`, data);
    return response.data;
};


// Lấy tất cả đơn hàng

export const fetchOrdersAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/orders`);
    return response.data;
};


export const fetchOrdersByUserAPI = async () => {
    try {
        const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/orders/order`);
        return response.data; // Trả về dữ liệu đơn hàng của người dùng
    } catch (error) {
        message.error('Không thể tải đơn hàng của bạn.');
        throw error;
    }
};

// Lấy đơn hàng theo orderId

export const fetchOrderByIdAPI = async ( id ) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/orders/${id}`);
    return response.data;
}

// Cập nhật đơn hàng

export const updateOrderAPI = async (id, data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/orders/${id}`,data);
    return response.data;
  };

// Xóa đơn hàng
export const deleteOrderAPI = async (id) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/orders/${id}`);
    return response.data;
  };

export const getOrderByIdAPI = async (id) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/orders/${id}`);
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

// Xóa reply của admin
export const deleteReplyAPI = async (reviewId, replyIndex) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/reviews/${reviewId}/reply/${replyIndex}`);
    return response.data;
};

// Dashboard

export const fetchDashboardDataAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboard`);
    return response.data;
}

// VNpay

export const createPaymentVnPayAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/vnpay/create-payment`, data);
    return response.data;
};

export const vnpayReturnAPI = async (data) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/vnpay/vnpay_return`, data);
    return response.data;
};

