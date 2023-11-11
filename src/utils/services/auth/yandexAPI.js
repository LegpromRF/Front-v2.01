import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";


export default function yandexAPI(data) {
    const redirectURI = apiEndpoints.yandexReg

    axios.post(redirectURI, {
        access_token: data.access_token
    })
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
