import { combineReducers, configureStore } from "@reduxjs/toolkit";
import navigationSlice from "@store/navigation/navigation.slice";
import authModalSlice from "@store/auth/authModal.slice";
import authSlice from "@store/auth/auth.slice";
import userdataSlice from "@store/session/userdata.slice";
import formSlice from "@store/orders/form.slice";
import procRegisterSlice from "@store/procurementRegister/procRegister.slice";
import viewTzSlice from "@store/viewTz/viewTz.slice";
import companiesSlice from "@store/companies/companies.slice";
import admindataSlice from "./session/admindata.slice";
import ordersSlice from "./orders/orders.slice";
import userSlice from "./user/user.slice";

const reducers = combineReducers({
  navigation: navigationSlice,
  authModal: authModalSlice,
  auth: authSlice,
  userdata: userdataSlice,
  admindata: admindataSlice,
  form: formSlice,
  orders: ordersSlice,
  companies: companiesSlice,
  procRegister: procRegisterSlice,
  viewTz: viewTzSlice,
  user: userSlice,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true
});
