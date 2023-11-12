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
                "silent_token": data.payload.silentToken,
                "uuid": data.payload.uuid
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


    console.log('data:', data)

    return axios.post(redirectURI, params)
        .then((response) => {
            console.log(response)
            if (response.data.status.ok) {
                return true
            } else {
                return response.data.details
            }
        })
        .catch((error) => console.log(error, params, data))
}
