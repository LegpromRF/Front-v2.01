import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import { createSlice } from "@reduxjs/toolkit";

export const admindataSlice = createSlice({
  name: "admindata",
  initialState: {
    isAdmin: null, // изначально null, потом false/true 
    currentUser: null,
    currentUserOrders: null, // для редактирования счетов пользователя в profile/subscriptions
  },
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setCurrentUserData: (state, action) => {
      state.currentUser = action.payload.user;
      const orders = action.payload.orders
      orders.sort((orderA, orderB) => new Date(orderB.created_at).getTime() - new Date(orderA.created_at).getTime())
      state.currentUserOrders = orders;
    },
    changeOrderStatus: (state, action) => {
      const id = action.payload.id;
      const newStatus = action.payload.status;

      state.currentUserOrders = state.currentUserOrders.map((order) => {
        if (order.order_id != id) return order;
        return {
          ...order,
          status: newStatus,
        };
      });

      try {
        fetch(`${apiHOST}orders/admin/edit/${id}/?status=${newStatus}`, {
          method: "POST",
          credentials: "include",
        });
      } catch(e) {
        console.error(e);
      }
    },  
  },
});

export const { setAdmin, setCurrentUserData, changeOrderStatus } =
  admindataSlice.actions;
export default admindataSlice.reducer;
