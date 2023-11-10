import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

export default async function vkAPI(data) {
    const redirectURI = apiEndpoints.vkLogin
    const params = {
        "api_version": "5.207",
        "silent_token": data.payload.token,
        "uuid": data.payload.uuid
    }

    return axios.post(redirectURI, params)
        .then((response) => response.data.status.ok ? true : response.data.details)
        .catch((error) => console.log(error, params, data))
}
