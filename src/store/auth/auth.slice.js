import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            axios.
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