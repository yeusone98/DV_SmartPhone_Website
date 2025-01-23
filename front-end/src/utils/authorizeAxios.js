import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const authorizedAxiosInstance = axios.create({
    timeout: 600000,
    withCredentials: true,
});

// Thêm Authorization token vào request
authorizedAxiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Xử lý response lỗi
authorizedAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Xử lý token hết hạn
        if (error.response?.status === 410 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post('/v1/users/refresh-token', null, {
                    withCredentials: true,
                });
                const { accessToken } = response.data;
                Cookies.set('accessToken', accessToken, {
                    secure: true,
                    sameSite: 'Strict',
                    path: '/',
                });
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return authorizedAxiosInstance(originalRequest);
            } catch (refreshError) {
                // Gọi callback đăng xuất thay vì sử dụng trực tiếp `store.dispatch`
                if (typeof handleLogout === 'function') {
                    handleLogout();
                }
                toast.error('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

// Định nghĩa callback đăng xuất
let handleLogout = null;
export const setLogoutHandler = (logoutHandler) => {
    handleLogout = logoutHandler;
};

export default authorizedAxiosInstance;
