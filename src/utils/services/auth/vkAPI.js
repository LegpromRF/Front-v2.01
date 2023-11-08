import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";


export default async function vkAPI(data, authMode) {
    let redirectURI = ``
    if (authMode === 'register') {
        redirectURI = apiEndpoints.vkReg
    } else if (authMode === 'login') {
        redirectURI = apiEndpoints.vkLogin
    }

    const params = {
        "api_version": "5.207",
        "silent_token": data.silentToken,
        "uuid": data.uuid
    }

    axios.post(redirectURI, params)
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
}
