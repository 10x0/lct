import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "authState",
  initialState: {
    loading: false,
    authenticated: false,
    user: null,
  },
  reducers: {
    loginPending: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.authenticated = true;
      state.user = payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.authenticated = false;
      state.user = null;
      localStorage.removeItem("_t");
    },
    logout: (state) => {
      state.loading = false;
      state.authenticated = false;
      state.user = null;
      localStorage.removeItem("_t");
    },
  },
});

export const { loginPending, loginSuccess, loginFailure, logout } =
  loginSlice.actions;

export default loginSlice.reducer;
