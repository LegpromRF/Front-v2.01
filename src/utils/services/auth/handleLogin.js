import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

export default function handleLogin(data, authMethod) {
    const apiURL = apiEndpoints.login
    const params = {
        login: data.login,
        kind: authMethod,
        password: data.password
    }

    console.log(params)
    axios.post(apiURL, params)
        .then((response) => {
            response && history.push('/profile/home')
        })
        .catch((error) => {
            console.error(error)
        })
}