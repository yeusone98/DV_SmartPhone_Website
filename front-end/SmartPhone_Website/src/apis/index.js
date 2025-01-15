import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'

export const fectchBoardDeatailsAPI = async (boardId) => {

  const respone = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}` )
  // Axios sẽ trả kết quả về qua property của nó là data
  return respone.data

}

/** Users */
export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Account created successfully! Please check and verify your account before logging in!', { theme: 'colored' })
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Account verified successfully! Now you can login to enjoy our services! Have a good day!', { theme: 'colored' })
  return response.data
}

export const logoutUserAPI = async () => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/logout`)
  return response.data
}

/** Refresh Token API */
export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/refresh-token`)
  return response.data // Trả về token mới
}

export const sendResetPasswordEmailAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/forgot-password`, data)
  return response.data
}

export const resetPasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/reset-password`, data)
  return response.data
}

export const fetchProductsAPI = async (query) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/products`, { params: query })
  return response.data
}

export const createProductAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/products`, data)
  return response.data
}

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
  return response.data; // Trả về dữ liệu từ API
};

export const deleteProductAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/products/${id}`)
  return response.data
}
