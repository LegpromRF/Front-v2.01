import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    authToken: null,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const { loginSuccess, logout, setAuthToken } = authSlice.actions;
export default authSlice.reducer;
