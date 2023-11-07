import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            history.push('/profile/home')
        },
        logout: (state) => {
            state.isAuthenticated = false;
            history.push('/')
        }

    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer