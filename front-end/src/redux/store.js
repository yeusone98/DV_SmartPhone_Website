import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer, logoutUserAPI } from '../features/user/userSlice';
import counterReducer from '../features/counter/counterSlice';
import { setLogoutHandler } from '../utils/authorizeAxios';

const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

// Kết hợp reducers
const appReducer = combineReducers({
    user: userReducer,
    counter: counterReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'user/logout') {
        state = undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

// Đăng ký callback để xử lý logout
setLogoutHandler(() => {
    store.dispatch(logoutUserAPI());
});

export default store;
