import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import vkAPI from "@/utils/services/auth/vkAPI.js";
import {loginSuccess} from "@store/auth/auth.slice.js";
import {useDispatch} from "react-redux";

function VKIDtokenpage() {
    let location = useLocation()
    const dispatcher = useDispatch()

    async function handleVKRegister(data) {
        try {
            await vkAPI(data, 'register')
            dispatcher(loginSuccess())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const payloadParam = urlParams.get('payload');

        if (payloadParam) {
            // Декодируем URL-кодированный JSON
            const decodedPayload = decodeURIComponent(payloadParam);
            const jsonPayload = JSON.parse(decodedPayload);

            // Теперь у вас есть доступ к данным пользователя и Silent token
            const data = {
                userData: jsonPayload.user,
                uuid: jsonPayload.uuid,
                silentToken: jsonPayload.token
            }

            handleVKRegister(data)
        }
    }, [location]);

    return (
        <>
        </>
    )
}

export default VKIDtokenpage