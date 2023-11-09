import { createSlice } from "@reduxjs/toolkit";

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
        }

    }
})

export const { loginSuccessful, logout } = authSlice.actions
export default authSlice.reducer