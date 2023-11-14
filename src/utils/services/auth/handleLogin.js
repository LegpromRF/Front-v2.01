import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

export default async function handleLogin(data, authMethod) {
    const apiURL = apiEndpoints.login
    let login = ''
    if (authMethod === "sms") {
        login = data.phone.replace(/\D/g, '')
    } else {
        login = data.email
    }

    const params = {
        login: login,
        kind: authMethod,
        password: data.password
    }

    console.log(params, data)
    return axios.post(apiURL, params)
        .then((response) => console.log(response))
        .then((response) => response.data.status === 204 ? true : response.data.details)
        .catch(() => false)
}