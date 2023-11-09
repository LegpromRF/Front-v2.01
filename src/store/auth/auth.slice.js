import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import {Navigate, redirect} from "react-router-dom";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        loginSuccessful: (state) => {
            state.isAuthenticated = true;
            console.log('state')
        },
        logout: (state) => {
            state.isAuthenticated = false;
            history.push('/')
        }

    }
})

export const { loginSuccessful, logout } = authSlice.actions
export default authSlice.reducer