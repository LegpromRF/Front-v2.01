import {useEffect} from 'react';
import {Config, Connect, ConnectEvents} from "@vkontakte/superappkit";
import styles from "@layout/Modal/ModalAuth/ModalAuth.module.scss";
import vkAPI from "@/utils/services/auth/vkAPI.js";

const VkAuth = () => {
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

        const oneTapButton = Connect.buttonOneTapAuth({
            callback: (event) => {
                const { type } = event;

                if (!type) {
                    return;
                }

                switch (type) {
                    case ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS:// = 'VKSDKOneTapAuthLoginSuccess'
                        console.log(event);
                        return onAuthUser(event)
                    case ConnectEvents.OneTapAuthEventsSDK.FULL_AUTH_NEEDED: //  = 'VKSDKOneTapAuthFullAuthNeeded'
                        console.log(event);
                        return
                    case ConnectEvents.OneTapAuthEventsSDK.PHONE_VALIDATION_NEEDED: // = 'VKSDKOneTapAuthPhoneValidationNeeded'
                        console.log(event);
                        return
                    case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN: // = 'VKSDKButtonOneTapAuthShowLogin'
                        console.log(event)
                        // vkAPI(event, 'register')
                        return Connect.redirectAuth({ url: 'https://legpromrfreact.vercel.app/tokenpage'} )
                    // case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN_OPTIONS: // = 'VKSDKButtonOneTapAuthShowLoginOptions'
                    //     console.log(event);
                    //     // Параметр url: ссылка для перехода после авторизации. Должен иметь https схему. Обязательный параметр.
                    //     return Connect.redirectAuth({url: 'https://legpromrfreact.vercel.app/tokenpage'})
                    //
                }
                console.log(event)
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

        // Ваш обработчик события, который вызывается при успешной авторизации пользователя
        function onAuthUser(evt) {
            // Здесь вы можете получить данные пользователя и Silent token из объекта evt
            const userData = evt.user;
            const silentToken = evt.token;

            // Теперь у вас есть доступ к данным пользователя и Silent token для дальнейшей обработки.
            console.log("User Data:", userData);
            console.log("Silent Token:", silentToken);

            // Вы можете использовать полученные данные и токен в соответствии с вашими потребностями.
        }

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
};

export default VkAuth;
