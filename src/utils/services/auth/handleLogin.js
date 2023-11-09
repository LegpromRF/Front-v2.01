import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginSuccessful} from "@store/auth/auth.slice.js";

export default function useHandleLogin(data, authMethod) {
    const dispatcher = useDispatch()
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
    axios.post(apiURL, params)
        .then(() => {
            dispatcher(loginSuccessful())
        })
        .catch((error) => {
            console.error(error)
        })
}