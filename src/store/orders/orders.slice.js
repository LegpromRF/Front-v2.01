import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";
import axios from "axios";

export const handleBids = createAsyncThunk("orders/getBids", async (query) => {
  const res = await axios.get(apiEndpoints.bidAll, { withCredentials: true })
  return res.data || [];
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    bids: []
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleBids.fulfilled, (state, action) => {
        state.bids = action.payload
      })
  },
});


export const getBids = () => useSelector(state => state.orders.bids)

export default ordersSlice.reducer;