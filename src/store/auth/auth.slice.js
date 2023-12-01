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
            const cookies = document.cookie
            const cookiesArray = cookies.split(';')
            let JWTtoken = null
            const JWTcookie = cookiesArray.find(cookie => cookie.trim().startsWith('legpromauth'))
            console.log(JWTtoken)
            if (JWTcookie) {
                state.authToken = JWTcookie.split('=')[1].trim();
            }
        },
        logout: (state) => {
            state.isAuthenticated = false
        }

    }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer