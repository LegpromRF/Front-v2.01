import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import {Navigate} from "react-router-dom";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            const params = {
                "login": action.payload.login,
                "kind": action.payload.authMethod,
                "password": action.payload.password
            }
            console.log(action)
            axios.post(apiEndpoints.login, params)
                .then((response) => {
                    console.log(response)
                    state.isAuthenticated = true;
                    history.push("/profile/home")
                })
                .catch((error) => console.log(error, params))


        },
        logout: (state) => {
            state.isAuthenticated = false;
            history.push('/')
        }

    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer