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
        login: (state) => {
            state.isAuthenticated = true;
            redirect('/profile')
        },
        logout: (state) => {
            state.isAuthenticated = false;
            history.push('/')
        }

    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer