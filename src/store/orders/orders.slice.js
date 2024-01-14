import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";
import axios from "axios";

export const handleAdminBids = createAsyncThunk("orders/handleAdminBids", async (_, thunkAPI) => {
  const size = 40
  const page = thunkAPI.getState().orders.adminBidsPageNumber
  // console.log(`${apiEndpoints.bidAll}/?page=${page}&size=${size}`);
  const res = await axios.get(`${apiEndpoints.orderCards}?page=${page}&size=${size}`, { withCredentials: true })
  console.log(res);
  // try {
  //   console.log('res', res.data.items.map(item => ({...item, id: item.order_number, photo_urls: item.photo_urls?.split(',') || null})));
  // } catch (e) {
  //   console.error(e);
  // }
  const stateData = {
    adminBidsPageNumber: res.data.page,
    adminBidsCountPages: res.data.pages,
    adminBids: res.data.items.map(item => ({...item, id: item.order_number, photo_urls: item.photo_urls?.split(',') || null})) ?? []
  }
  return stateData
});

export const handleBids = createAsyncThunk("orders/handleBids", async (_, thunkAPI) => {
  const size = 40
  const page = thunkAPI.getState().orders.bidsPageNumber
  // console.log(`${apiEndpoints.bidAll}/?page=${page}&size=${size}`);
  const res = await axios.get(`${apiEndpoints.bidAll}?page=${page}&size=${size}`, { withCredentials: true })
  const stateData = {
    bidsPageNumber: res.data.page,
    bidsCountPages: res.data.pages,
    bids: res.data.items ?? []
  }
  return stateData
});

export const searchBid = createAsyncThunk("orders/searchBid", async (id, thunkAPI) => {
  if (!id) return null

  const isAdmin = thunkAPI.getState().admindata.isAdmin
  
  if (isAdmin) {
    const res = await axios.get(apiEndpoints.getOrderCard(id), { withCredentials: true })
    res.data.id = res.data.order_number 
    return res.data
  } else {
    const userBids = thunkAPI.getState().orders.bids
    const bid = userBids.find(bid => bid.id == id)
    if (bid) return bid
    else throw new Error()
  }
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    currentBid: null, //для админов, найденная в поиске заявка
    
    bids: [],
    bidsCountPages: null,
    bidsPageNumber: 1,
    
    adminBids: [],
    adminBidsCountPages: null,
    adminBidsPageNumber: 1,
  },
  reducers: {
    changeBidsPage: (state, action) => {
      state.bidsPageNumber = action.payload;
    },
    changeAdminBidsPage: (state, action) => {
      state.adminBidsPageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAdminBids.fulfilled, (state, action) => {
        const { adminBids, adminBidsCountPages, adminBidsPageNumber } = action.payload
        
        state.adminBids = adminBids;
        state.adminBidsCountPages = adminBidsCountPages;
        state.adminBidsPageNumber = adminBidsPageNumber;
      })
      .addCase(handleBids.fulfilled, (state, action) => {
        const { bids, bidsCountPages, bidsPageNumber } = action.payload
        
        state.bids = bids;
        state.bidsPageNumber = bidsPageNumber;
        state.bidsCountPages = bidsCountPages;
      })
      .addCase(searchBid.fulfilled, (state, action) => {
        state.currentBid = action.payload
      })
      .addCase(searchBid.rejected, (state, action) => {
        state.currentBid = undefined
      })
  },
});


export const { changeAdminBidsPage, changeBidsPage } = ordersSlice.actions

export default ordersSlice.reducer;