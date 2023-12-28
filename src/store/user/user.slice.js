import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../auth/authApi";

const auth = new authApi();

export const getAdminRole = createAsyncThunk("users/admin", async () => {
  const response = await auth.isAdmin();

  if (!response.ok) {
    throw new Error("Bad Request");
  }

  return await response.json();
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAdminRole.fulfilled, (state) => {
        state.isAdmin = true;
      })
      .addCase(getAdminRole.rejected, (state) => {
        state.isAdmin = false;
      });
  },
});

export const { setAdmin } = userSlice.actions;

export const user = (state) => state.user;

export default userSlice.reducer;
