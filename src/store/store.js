import {combineReducers, configureStore} from '@reduxjs/toolkit'
import navigationSlice from "@store/navigation/navigation.slice";
import authModalSlice from "@store/auth/authModal.slice"
import authSlice from "@store/auth/auth.slice";
import userdataSlice from "@store/session/userdata.slice"
import formSlice from "@store/orderForm/form.slice"
import companiesSlice from "@store/companies/companies.slice"
import {persistedReducer} from "../../persistConfig.js";
import {rootReducer} from "@reduxjs/toolkit/src/tests/injectableCombineReducers.example.js";

const reducers = combineReducers({
    navigation: navigationSlice,
    authModal: authModalSlice,
    auth: authSlice,
    userdata: userdataSlice,
    form: formSlice,
    companies: companiesSlice,
})

export const store = configureStore({
    reducer: persistedReducer(rootReducer),
    devTools: true,
})
