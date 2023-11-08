
import {Navigate, useLocation} from "react-router-dom";
import {useEffect} from "react";

function TokenPage() {
   let location = useLocation()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const payloadParam = urlParams.get('payload');

        if (payloadParam) {
            // Декодируем URL-кодированный JSON
            const decodedPayload = decodeURIComponent(payloadParam);
            const jsonPayload = JSON.parse(decodedPayload);

            // Теперь у вас есть доступ к данным пользователя и Silent token
            const userData = jsonPayload.user;
            const silentToken = jsonPayload.token;

            // Выводим полученные данные в консоль
            console.log("User Data:", userData);
            console.log("Silent Token:", silentToken);
        }
    }, [location]);

    return (
        <>
        </>
    )
}

export default TokenPage