import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  productSearch: null,
  error: null
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchStart: (state, action) => {
        state.loading = true
    },
    searchSuccess: (state, action) => {
        state.loading = false,
        state.productSearch = action.payload
    },
    searchFailed: (state, action) => {
        state.loading = false,
        state.erroo = action.payload
    },
  },
});

export const {
    searchStart,
    searchSuccess,
    searchFailed
} = searchSlice.actions

export default searchSlice.reducer;
