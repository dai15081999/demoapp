import { createSlice } from "@reduxjs/toolkit";
import Noty from "noty";

const ISSERVER = typeof window === "undefined";

const initialState = {
  cartItems: !ISSERVER
    ? localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [] : []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existItem = state.cartItems.find(
        (it) => it._id === action.payload._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === existItem._id ? action.payload : item
        );
        if (!ISSERVER) localStorage.setItem("cart", JSON.stringify(state.cartItems));
        return;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
        if (!ISSERVER) localStorage.setItem("cart", JSON.stringify(state.cartItems));
        return;
      }
    },
    deleteItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload.toString()
      );
      if (!ISSERVER)
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Xóa thành công",
        progressBar: false,
      }).show()
      return
    },
    removeCart: (state, action) => {
      state.cartItems = []
      if (!ISSERVER) {
        localStorage.removeItem('cart')
      }
    }
  },
});

export const { addToCart, deleteItemFromCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
