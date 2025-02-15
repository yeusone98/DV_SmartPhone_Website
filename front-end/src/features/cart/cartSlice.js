import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Danh sách sản phẩm trong giỏ hàng
  totalQuantity: 0, // Tổng số lượng sản phẩm
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    updateCartQuantity(state) {
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product_id === product.product_id &&
          item.color === product.color &&
          item.storage === product.storage
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      state.totalQuantity += quantity;
    },
    increaseQuantity(state, action) {
      const { product_id, color, storage } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product_id === product_id &&
          item.color === color &&
          item.storage === storage
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
      }
    },
    removeFromCart(state, action) {
      const { product_id, color, storage } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.product_id === product_id &&
            item.color === color &&
            item.storage === storage
          )
      );
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const {
  setCart,
  updateCartQuantity,
  addToCart,
  increaseQuantity, 
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
