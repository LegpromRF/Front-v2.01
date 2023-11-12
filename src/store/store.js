import {combineReducers, configureStore} from '@reduxjs/toolkit'
import navigationSlice from "@store/navigation/navigation.slice";
import authModalSlice from "@store/auth/authModal.slice"
import authSlice from "@store/auth/auth.slice";
import userdataSlice from "@store/session/userdata.slice"

const reducers = combineReducers({
    navigation: navigationSlice,
    authModal: authModalSlice,
    auth: authSlice,
    userdata: userdataSlice
})

export const store = configureStore({
    reducer: reducers,
    devTools: true,
})
