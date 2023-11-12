import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

export default async function vkAPI(data, authMode) {
    const redirectURI = authMode === "login" ? apiEndpoints.vkLogin : apiEndpoints.vkReg
    const params = {
        "api_version": "5.207",
        "silent_token": data.silentToken,
        "uuid": data.uuid
    }

    console.log(data)

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
