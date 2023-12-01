import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

export default async function vkAPI(data, authMode) {
    let redirectURI
    let params

    switch (authMode) {
        case "login":
            redirectURI= apiEndpoints.vkLogin
            params = {
                "api_version": "5.207",
                "silent_token": data.payload.token,
                "uuid": data.payload.uuid,
            }
            break
        case "register":
            redirectURI= apiEndpoints.vkReg
            params = {
                "api_version": "5.207",
                "silent_token": data.silentToken,
                "uuid": data.uuid
            }
            break
    }

    try {
        const response = await axios.post(redirectURI, params, {
            withCredentials: true,
            AccessControlAllowOrigin: true
        })

        if (response.data.status === 204) {
            const cookies = document.cookie
            const cookiesArray = cookies.split(';')
            console.log(cookiesArray)
            let JWTtoken = null
            const JWTcookie = cookiesArray.find(cookie => cookie.trim().startsWith('legpromauth'))
            console.log(JWTcookie)
            if (JWTcookie) {
                JWTtoken = JWTcookie.split('=')[1].trim();
                return JWTtoken
            } else {
                // Обработка ошибки: отсутствие куки
                throw new Error("JWT cookie not found");
            }
        } else {
            return response.data.details
        }
    } catch (error) {
        console.log(error)
    }
}
