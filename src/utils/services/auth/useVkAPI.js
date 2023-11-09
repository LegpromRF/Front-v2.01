import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginSuccessful} from "@store/auth/auth.slice.js";



export default async function useVkAPI(data) {
    const dispatcher = useDispatch()
    const redirectURI = apiEndpoints.vkLogin
    const params = {
        "api_version": "5.207",
        "silent_token": data.silentToken,
        "uuid": data.uuid
    }

    axios.post(redirectURI, params)
        .then((response) => {
            console.log(response)
            dispatcher(loginSuccessful())
        })
        .catch((error) => console.log(error))
}
