import {combineReducers, configureStore} from '@reduxjs/toolkit'
import navigationSlice from "@store/navigation/navigation.slice";
import authModalSlice from "@store/auth/authModal.slice"
import authSlice from "@store/auth/auth.slice";

const reducers = combineReducers({
    navigation: navigationSlice,
    authModal: authModalSlice,
    auth: authSlice
})

export const store = configureStore({
    reducer: reducers,
    devTools: true,
})
