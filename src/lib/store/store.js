import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/app/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
