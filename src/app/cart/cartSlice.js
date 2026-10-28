import { createSlice } from "@reduxjs/toolkit";

const MAX_QUANTITY = 10;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = Math.min(
          MAX_QUANTITY,
          existingItem.quantity + 1,
        );
        return;
      }

      state.items.push({ ...product, quantity: 1 });
    },
    increaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);

      if (item) {
        item.quantity = Math.min(MAX_QUANTITY, item.quantity + 1);
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);

      if (item) {
        item.quantity = Math.max(1, item.quantity - 1);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
