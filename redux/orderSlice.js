import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  orderSuccess: null,
  error: null,
  orderID: null,
  updateSuccess: false
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action) => {
        state.loading = true
    },
    createOrderSuccess: (state, action) => {
        state.loading = false
        state.orderSuccess = action.payload
        state.error = null
    },
    createOrderFailed: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    getOrderUser: (state, action) => {
        state.loading = true
    },
    getOrderUserSuccess: (state, action) => {
        state.loading = false
        state.orderSuccess = action.payload
        state.error = null
    },
    getOrderUserFailed: (state, action) => {
         state.loading = false
        state.error = action.payload
    },
    getOrderID: (state, action) => {
        state.loading = true
    },
    getOrderIDsuccess: (state, action) => {
        state.loading = false
        state.orderID = action.payload
        state.error = null
    },
    getOrderIDfailed: (state, action) => {
         state.loading = false
        state.error = action.payload
    },
    updateStatus: (state, action) => {
        state.loading = true
    },
    updateStatusSuccess: (state, action) => {
        state.loading = false,
        state.updateSuccess = action.payload
    },
    updateFalied: (state, action) => {
        state.loading = false
        state.error = action.payload
    }
  },
});

export const {
    updateStatusSuccess,
    updateStatus,
    updateFalied,
    createOrder,
    createOrderSuccess,
    createOrderFailed,
    getOrderUser,
    getOrderUserSuccess,
    getOrderUserFailed,
    getOrderID,
    getOrderIDsuccess,
    getOrderIDfailed
} = orderSlice.actions

export default orderSlice.reducer;
