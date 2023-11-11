import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import vkAPI from "@/utils/services/auth/vkAPI.js";
import {loginSuccess} from "@store/auth/auth.slice.js";
import {useDispatch, useSelector} from "react-redux";

function VKIDtokenpage() {
    let location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        isAuthenticated && navigate('/profile/home')
    }, [isAuthenticated]);

    async function handleVKRegister(data) {
        try {
            if (await vkAPI(data)) {
                dispatch(loginSuccess())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const payloadParam = urlParams.get('payload');

        if (payloadParam) {
            const decodedPayload = decodeURIComponent(payloadParam);
            const jsonPayload = JSON.parse(decodedPayload);

            const data = {
                userData: jsonPayload.user,
                uuid: jsonPayload.uuid,
                silentToken: jsonPayload.token
            }

            console.log(data)

            handleVKRegister(data)
        }
    }, [location]);

    return (
        <>
        </>
    )
}

export default VKIDtokenpage