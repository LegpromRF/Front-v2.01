import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";
import axios from "axios";

export const handleBids = createAsyncThunk("orders/getBids", async (query) => {
  const res = await axios.get(apiEndpoints.bidAll, { withCredentials: true })
  return res.data || [];
});

export const searchBid = createAsyncThunk("orders/searchBid", async (id) => {
  if (!id) return null

  const res = await axios.get(apiEndpoints.getBidCreate(id), { withCredentials: true })
  return res.data
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    bids: [],
    currentBid: null //for admins
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleBids.fulfilled, (state, action) => {
        state.bids = action.payload
      })
      .addCase(searchBid.fulfilled, (state, action) => {
        state.currentBid = action.payload
      })
  },
});


export const getBids = () => useSelector(state => state.orders.bids)
export const getCurrentBid = () => useSelector(state => state.orders.currentBid)

export default ordersSlice.reducer;