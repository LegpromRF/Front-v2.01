import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    authMode: "login",
    authMethod: "email",
    verifying: false,
    authIssue: "",
  },
  reducers: {
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
    setAuthMethod: (state, action) => {
      state.authMethod = action.payload;
    },
    setVerifying: (state, action) => {
      state.verifying = action.payload;
      state.authMode = null;
    },
    setAuthIssue: (state, action) => {
      state.authIssue = action.payload;
    },
  },
});

export const { setAuthMethod, setAuthMode, setVerifying } =
  authModalSlice.actions;
export default authModalSlice.reducer;
