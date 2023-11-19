import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        authToken: null
    },
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticated = true
            state.authToken = state.payload
        },
        logout: (state) => {
            state.isAuthenticated = false
        }

    }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer