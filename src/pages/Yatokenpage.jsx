import {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginSuccess} from "@store/auth/auth.slice.js";
import yandexAPI from "@/utils/services/auth/yandexAPI.js";

const Yatokenpage = () => {
    // Хук для парсинга URL
    const location = useLocation()

    // Хук для изменения стейта успешной авторизации
    const dispatcher = useDispatch()

    async function handleYaRegister(data) {
        try {
            await yandexAPI(data, 'register')
            alert(await yandexAPI(data, 'register'))
            dispatcher(loginSuccess())
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    useEffect(() => {
        //  Подключение скрипта от Yandex ID
        const yandexScript = document.createElement('script');
        yandexScript.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js';
        yandexScript.async = true;
        yandexScript.defer = true;
        document.head.appendChild(yandexScript);

        // Парсинг URL
        const urlParams = new URLSearchParams(location.hash);
        const payloadParam = urlParams.get('payload');
        console.log(payloadParam)

        if (payloadParam) {
            const decodedPayload = decodeURIComponent(payloadParam);
            const jsonPayload = JSON.parse(decodedPayload);

            const data = {
                access_token: jsonPayload.access_token,
            }

            handleYaRegister(data)

            yandexScript.onload = () => {
                window.YaSendSuggestToken(
                    'https://legpromrfreact.vercel.app/',
                    {}
                );
            };
        }


    }, [location]);

    return (
        <>
        </>
    );
};

export default Yatokenpage;
