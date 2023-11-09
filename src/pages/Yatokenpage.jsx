import {useEffect} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "@store/auth/auth.slice.js";
import yandexAPI from "@/utils/services/auth/yandexAPI.js";

const Yatokenpage = () => {
    let location = useLocation()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const dispatcher = useDispatch()
    async function handleYaRegister(data) {
        try {
            await yandexAPI(data, 'register')
            dispatcher(login)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const yandexScript = document.createElement('script');
        yandexScript.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
        yandexScript.async = true;
        document.head.appendChild(yandexScript);


        const urlParams = new URLSearchParams(location.hash);
        const payloadParam = urlParams.get('payload');

        if (payloadParam) {
            const decodedPayload = decodeURIComponent(payloadParam);
            const jsonPayload = JSON.parse(decodedPayload);

            const data = {
                access_token: jsonPayload.access_token,
            }

            handleYaRegister(data)
        }

        window.onload = () => {
            window.YaSendSuggestToken(
                'https://legpromrfreact.vercel.app/'
            )
        }
    }, [location]);

    return (
        <>
            {
                // isAuthenticated && <Navigate to={'/profile'} />
            }
        </>
    );
};

export default Yatokenpage;
