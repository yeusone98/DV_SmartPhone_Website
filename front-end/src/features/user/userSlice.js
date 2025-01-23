import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '../../utils/authorizeAxios';
import { API_ROOT } from '../../utils/constants';

// Khởi tạo giá trị State
const initialState = {
    currentUser: null,
};

// Thực hiện đăng nhập
export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async(data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data);
    return response.data;
});

// Thực hiện đăng xuất
export const logoutUserAPI = createAsyncThunk('user/logoutUserAPI', async() => {
    await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/logout`);
    return null;
});

// Khởi tạo slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAPI.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(logoutUserAPI.fulfilled, (state) => {
                state.currentUser = null;
            });
    },
});

// Export các actions và selectors
export const { logout } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export const userReducer = userSlice.reducer;