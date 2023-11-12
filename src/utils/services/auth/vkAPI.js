import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

export default async function vkAPI(data, authMode) {
    let redirectURI
    let params

    switch (authMode) {
        case "login":
            redirectURI= apiEndpoints.vkLogin
            params = {
                "api_version": "5.207",
                "silent_token": data.payload.token,
                "uuid": data.payload.uuid,
            }
            break
        case "register":
            redirectURI= apiEndpoints.vkReg
            params = {
                "api_version": "5.207",
                "silent_token": data.silentToken,
                "uuid": data.uuid
            }
            break
    }

    return axios
        .post(redirectURI, params, {
            withCredentials: true
        })
        .then((response) => {
            if (response.data.status === 204) {
                return true
            } else {
                return response.data.details
            }
        })
        .catch((error) => console.log(error, params, data))
}
