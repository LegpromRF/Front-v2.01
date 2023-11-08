import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";


export default function yandexAPI(data, authMode) {
    let redirectURI = ``
    if (authMode === 'register') {
        const redirectURI = apiEndpoints.yandexReg
    } else if (authMode === 'login') {
        const redirectURI = apiEndpoints.yandexLogin
    }
    axios.post(redirectURI, {
        access_token: data.access_token
    })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
}
