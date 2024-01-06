import { createSlice } from "@reduxjs/toolkit";

export const userdataSlice = createSlice({
  name: "userdata",
  initialState: {
    username: "",
    specification: null,
    userOrders: null, //выставленные счета
    userSubscriprions: null, //выставленные счета
  },
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setSpecification: (state, action) => {
      state.specification = action.payload;
    },
    setUserOrders: (state, action) => {
      state.userOrders = action.payload
    },
    setUserSubscriprions: (state, action) => {
      state.userSubscriprions = action.payload
    }
  },
});

export const { setUserName, setSpecification, setUserOrders, setUserSubscriprions } = userdataSlice.actions;
export default userdataSlice.reducer;
