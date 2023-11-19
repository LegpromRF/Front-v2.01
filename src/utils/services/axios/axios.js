import axios from "axios";
import {store} from "@store/store.js";

axios.interceptors.request.use((config) => {
    const token = store.getState().auth.authToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return token
}, (error) => {
    return Promise.reject(error)
})




