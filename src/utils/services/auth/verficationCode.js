import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

export default async function handleVerification(authMethod, data) {
    let login = ''
    if (authMethod === "sms") {
        login = data.phone.replace(/\D/g, '')
    } else {
        login = data.email
    }
    const apiURL = apiEndpoints.verification
    const params = {
        login: login,
        kind: authMethod
    }

    axios.get(apiURL, { params })
        .then((response) => {
            console.log('Success:', response.data)
        })
        .catch((error) => {
            console.log('Error:', error)
        })

    console.log(data, login, authMethod)
}