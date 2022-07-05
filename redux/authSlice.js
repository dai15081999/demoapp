import { createSlice } from "@reduxjs/toolkit";

const ISSERVER = typeof window === "undefined";

const initialState = {
  loading: false,
  userInfo: !ISSERVER
    ? localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null
    : null,
  error: null,
  success: false,
  auth: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMessage: (state, action) => {
      state.error = null;
    },
    login: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.auth = action.payload.auth;
      state.userInfo = action.payload;
      if (!ISSERVER)
        localStorage.setItem(
          "userInfo",
          JSON.stringify(action.payload)
        )
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state, action) {
      state.userInfo = null
      if (!ISSERVER) localStorage.removeItem('userInfo')
    },
    register: (state, action) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  login,
  logout,
  loginFailed,
  loginSuccess,
  register,
  registerSuccess,
  registerFailed,
  resetMessage,
} = authSlice.actions;

export default authSlice.reducer;
