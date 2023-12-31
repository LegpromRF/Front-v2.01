import {useEffect} from 'react';
import {Config, Connect, ConnectEvents} from "@vkontakte/superappkit";
import styles from "@layout/Modal/ModalAuth/ModalAuth.module.scss";
import {useDispatch} from "react-redux";
import {loginSuccess, setAuthToken} from "@store/auth/auth.slice.js";
import vkAPI from "@/utils/services/auth/vkAPI.js";
import {useNavigate} from "react-router-dom";

export default function VkAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        Config.init({
            appId: 51786995,

            appSettings: {
                agreements: '',
                promo: '',
                vkc_behavior: '',
                vkc_auth_action: '',
                vkc_brand: '',
                vkc_display_mode: '',
            },
        });

        async function processLogin(event) {
            try {
                const token = await vkAPI(event, 'login')
                dispatch(loginSuccess())
                dispatch(setAuthToken(token))
            } catch (error) {
                console.error("Login error:", error);
            }
            navigate('/profile')
        }

        const oneTapButton = Connect.buttonOneTapAuth({
            callback: async (event) => {
                const { type } = event

                if (!type) {
                    return
                }

                switch (type) {
                    case ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS:// = 'VKSDKOneTapAuthLoginSuccess'
                        console.log(event);
                        return processLogin(event)
                    case ConnectEvents.OneTapAuthEventsSDK.FULL_AUTH_NEEDED: //  = 'VKSDKOneTapAuthFullAuthNeeded'
                        console.log(event);
                        return
                    case ConnectEvents.OneTapAuthEventsSDK.PHONE_VALIDATION_NEEDED: // = 'VKSDKOneTapAuthPhoneValidationNeeded'
                        console.log(event);
                        return
                    case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN: // = 'VKSDKButtonOneTapAuthShowLogin'
                        console.log(event)
                        // vkAPI(event, 'register')
                        return Connect.redirectAuth({ url: 'https://legpromrfreact.vercel.app/VKIDtokenpage'} )
                    // case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN_OPTIONS: // = 'VKSDKButtonOneTapAuthShowLoginOptions'
                    //     console.log(event);
                    //     // Параметр url: ссылка для перехода после авторизации. Должен иметь https схему. Обязательный параметр.
                    //     return Connect.redirectAuth({url: 'https://legpromrfreact.vercel.app/tokenpage'})
                    //
                }
            },
            options: {
                showAlternativeLogin: false,
                showAgreements: false,
                displayMode: 'default',
                langId: 0,
                buttonSkin: 'primary',
                buttonStyles: {
                    borderRadius: 30,
                    height: 40,
                },
            },
        });

        if (oneTapButton) {
            document
                .getElementById('vk')
                .appendChild(oneTapButton.getFrame());
        }

    }, []);
    return (
        <div
            className={styles.form__ID}
            id="vk"
        ></div>
    );
}
