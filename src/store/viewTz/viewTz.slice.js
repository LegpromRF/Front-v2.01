import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCard = createAsyncThunk("users/getCard", async (id) => {
  const response = await fetch(`https://api.legpromrf.ru/order_cards/${id}`);
  return await response.json();
});

export const viewTzSlice = createSlice({
  name: "viewTz",
  initialState: {
    loading: false,
    item: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCard.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loading = false;
      });
  },
});

// export const {} = procRegisterSlice.actions;
export default viewTzSlice.reducer;
