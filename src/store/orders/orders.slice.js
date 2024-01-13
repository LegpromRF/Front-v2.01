import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";
import axios from "axios";

export const handleBids = createAsyncThunk("orders/getBids", async (_, thunkAPI) => {
  const size = 40
  const page = thunkAPI.getState().orders.pageNumber
  console.log(`${apiEndpoints.bidAll}/?page=${page}&size=${size}`);
  const res = await axios.get(`${apiEndpoints.bidAll}/?page=${page}&size=${size}`, { withCredentials: true })
  const stateData = {
    pageNumber: res.data.page,
    countPages: res.data.pages,
    bids: res.data.items ?? []
  }
  return stateData
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
    countPages: null,
    pageNumber: 1,
    currentBid: null //для админов, найденная в поиске заявка
  },
  reducers: {
    changeOrdersPage: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleBids.fulfilled, (state, action) => {
        const { bids, countPages, pageNumber } = action.payload
        
        state.bids = bids;
        state.pageNumber = pageNumber;
        state.countPages = countPages;
      })
      .addCase(searchBid.fulfilled, (state, action) => {
        state.currentBid = action.payload
      })
  },
});


export const getBids = () => useSelector(state => state.orders.bids)
export const getCurrentBid = () => useSelector(state => state.orders.currentBid)

export const { changeOrdersPage } = ordersSlice.actions

export default ordersSlice.reducer;