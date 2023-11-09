import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";


export default function yandexAPI(data) {
    const redirectURI = apiEndpoints.yandexReg

    axios.post(redirectURI, {
        access_token: data.access_token
    })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
}
