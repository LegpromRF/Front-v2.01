import axios from 'axios'

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {useEffect} from 'react';
import {Controller, useForm} from "react-hook-form";
import { Config, Connect, ConnectEvents } from '@vkontakte/superappkit';

import InputMask from 'react-input-mask';
// import Link from "next/link";

import {useDispatch, useSelector} from "react-redux";
import {setAuthMethod, setVerifying, toggleModal } from "@/store/auth/authModal.slice.js";
import {login} from "@store/auth/auth.slice";
import ModalLayout from '@layout/Modal/ModalLayout.jsx';
import styles from './ModalRegister.module.scss';
import {createSelector} from "@reduxjs/toolkit";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";


const ModalAuth = () => {

    const selectAuthModal = (state) => state.authModal
    const selectAuthModalData = createSelector(selectAuthModal, (authModal) => ({
        authMode: authModal.authMode,
        authMethod: authModal.authMethod,
        verifying: authModal.verifying,
    }))
    const { authMode, authMethod, verifying } = useSelector(selectAuthModalData)

    const selectAuth = (state) => state.auth
    const selectAuthData = createSelector(selectAuth, (auth) => ({
        isAuthenticated: auth.isAuthenticated
    }))

    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Введите действительный адрес электронной почты')
            .required('Поле "Email" обязательно'),
        phone: yup
            .string()
            .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона')
            .required('Поле "Телефон" обязательно'),
        password: yup
            .string()
            .min(6, 'Минимальная длина пароля должна быть 6 символов')
            .required('Поле "Пароль" обязательно'),
        verificationCode: yup
            .string()

    }, [['phone', 'email']]);

    const {
        control,
        formState: { errors },
        getValues
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {

        const script = document.createElement('script');
        script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.YaAuthSuggest.init(
                {
                    client_id: 'a6273e01cb89483dbecc90c845a8360a',
                    response_type: 'token',
                },
                `https://legprom-rf.vercel.app/tokenpage/`,
                {
                    view: "button",
                    parentId: "yandex",
                    buttonSize: 'xs',
                    buttonView: 'main',
                    buttonTheme: 'light',
                    buttonBorderRadius: "18",
                    buttonIcon: 'ya',
                }
            )
                .then(function(result) {
                    return result.handler()
                })
                .then(function(data) {
                    let redirectURI = ``
                    if (authMode === 'register') {
                        const redirectURI = apiEndpoints.yandexReg
                    } else if (authMode === 'login') {
                        const redirectURI = apiEndpoints.yandexLogin
                    }
                    axios.post(redirectURI, {
                        access_token: data.access_token
                    })
                        .then((response) => console.log(response.data))
                        .catch((error) => console.log(error))

                    console.log('Сообщение с токеном: ', data);
                    document.body.innerHTML += `Сообщение с токеном: ${JSON.stringify(data)}`;
                })
                .catch(function(error) {
                    console.log('Что-то пошло не так: ', error);
                    document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(error)}`;
                });
        };

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
                    case ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS: // = 'VKSDKOneTapAuthLoginSuccess'
                        console.log(event);
                        return
                    case ConnectEvents.OneTapAuthEventsSDK.FULL_AUTH_NEEDED: //  = 'VKSDKOneTapAuthFullAuthNeeded'
                    case ConnectEvents.OneTapAuthEventsSDK.PHONE_VALIDATION_NEEDED: // = 'VKSDKOneTapAuthPhoneValidationNeeded'
                    case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN: // = 'VKSDKButtonOneTapAuthShowLogin'
                        return Connect.redirectAuth({ url: 'https://legprom-rf.vercel.app/tokenpage'})
                    case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN_OPTIONS: // = 'VKSDKButtonOneTapAuthShowLoginOptions'
                        // Параметр url: ссылка для перехода после авторизации. Должен иметь https схему. Обязательный параметр.
                        return Connect.redirectAuth({url: 'https://legprom-rf.vercel.app/tokenpage'})
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

    }, [authMode]);


    const handleVerification = async (kind) => {
        const data = getValues()
        let login = ''
        if (kind === "sms") {
            login = data.phone.replace(/\D/g, '')
        } else {
            login = data.email
        }
        const apiURL = apiEndpoints.verification
        const params = {
            login: login,
            kind: kind
        }

        axios.get(apiURL, { params })
            .then((response) => {
                console.log('Success:', response.data)
            })
            .catch((error) => {
                console.log('Error:', error)
            })

        dispatch(setVerifying())
        console.log(data, login, kind)
    }
    const onSubmit = async () => {
        const data = getValues()
        console.log(data)
        let login = ''
        if (authMethod === "sms") {
            login = data.phone.replace(/\D/g, '')
        } else {
            login = data.email
        }

        const apiURL = apiEndpoints.register
        const params = {
            login: login,
            kind: authMethod,
            verification_code: data.verificationCode.replace(/\s/g, ''),
            password: data.password
        }

        axios.post(apiURL,  params)
            .then((response) => {
                dispatch(toggleModal())
                console.log('Success', response)
            })
            .catch((error) => {
                console.log('Error:', error)
                console.log(params)
            })
    }


    return (
        <ModalLayout>
            {
                authMode === 'register' && (
                    <form className={styles.form}>
                        <div className={styles.form__header}>
                            <div className={styles.form__title}>Регистрация</div>
                            <div
                                className={styles.form__subtitle}
                            >
                                Уже зарегистрированы?
                                {/*<Link*/}
                                {/*    className={styles.form__mode}*/}
                                {/*    onClick={() => dispatch(setAuthMode('login'))}*/}
                                {/*    href={""}*/}
                                {/*>*/}
                                {/*    Войти*/}
                                {/*</Link>*/}
                            </div>
                            <div className={styles.switch}>
                                <div
                                    className={(authMethod === 'email' ? `${styles.switch__item_active} ${styles.switch__item}` : styles.switch__item)}
                                    onClick={() => dispatch(setAuthMethod('email'))}
                                >
                                    Почта
                                </div>
                                <div
                                    className={(authMethod === 'sms' ? `${styles.switch__item_active} ${styles.switch__item}` : styles.switch__item)}
                                    onClick={() => dispatch(setAuthMethod('sms'))}
                                >
                                    Телефон
                                </div>
                            </div>
                        </div>
                        <div className={styles.form__inputs}>
                            {
                                authMethod === 'email'?
                                    <>
                                        <Controller
                                            name='email'
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type='text'
                                                    placeholder='Почта'
                                                    {...field}
                                                />
                                            )} />
                                        {errors.email && <p>{errors.email.message}</p>}
                                    </>
                                    :
                                    <>
                                        <Controller
                                        name='phone'
                                        control={control}
                                        render={({ field }) => (
                                            <InputMask
                                                mask="+7 (999) 999-99-99"
                                                type='text'
                                                placeholder='Телефон'
                                                {...field}
                                            />
                                        )} />
                                        {errors.phone && <p>{errors.phone.message}</p>}
                                    </>
                            }
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type='password'
                                        placeholder='Придумайте пароль'
                                        {...field}
                                    />
                                )} />
                            {errors.password && <p>{errors.password.message} </p>}
                            <button
                                className={styles.form__button}
                                onClick={() => handleVerification(authMethod)}
                                type={"button"}
                                disabled={getValues.length === 0 && Object.keys(errors).length > 0}
                            >
                                Далее
                            </button>
                        </div>
                        <div className={styles.form__footer}>
                            <div
                                className={styles.form__ID}
                                id="yandex"
                            ></div>
                            <div
                                className={styles.form__ID}
                                id="vk"
                            ></div>
                        </div>
                    </form>
                )
            }
            {
                authMode === 'login' && (
                    <form className={styles.form}>
                        <div className={styles.form__header}>
                            <div className={styles.form__title}>Вход</div>
                            <div
                                className={styles.form__subtitle}
                            >
                                Уже есть аккаунт?
                                {/*<Link*/}
                                {/*    className={styles.form__mode}*/}
                                {/*    onClick={() => dispatch(setAuthMode('register'))}*/}
                                {/*    href={""}*/}
                                {/*>*/}
                                {/*    Зарегистрироваться*/}
                                {/*</Link>*/}
                            </div>
                            <div className={styles.switch}>
                                <div
                                    className={(authMethod === 'email' ? `${styles.switch__item_active} ${styles.switch__item}` : styles.switch__item)}
                                    onClick={() => dispatch(setAuthMethod('email'))}
                                >
                                    Почта
                                </div>
                                <div
                                    className={(authMethod === 'sms' ? `${styles.switch__item_active} ${styles.switch__item}` : styles.switch__item)}
                                    onClick={() => dispatch(setAuthMethod('sms'))}
                                >
                                    Телефон
                                </div>
                            </div>
                        </div>
                        <div className={styles.form__inputs}>
                            {
                                authMethod === 'email'?
                                    <>
                                        <Controller
                                            name='email'
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type='text'
                                                    placeholder='Почта'
                                                    {...field}
                                                />
                                            )} />
                                        {errors.email && <p>{errors.email.message}</p>}
                                    </>
                                    :
                                    <>
                                        <Controller
                                            name='phone'
                                            control={control}
                                            render={({ field }) => (
                                                <InputMask
                                                    mask="+7 (999) 999-99-99"
                                                    type='text'
                                                    placeholder='Телефон'
                                                    {...field}
                                                />
                                            )} />
                                        {errors.phone && <p>{errors.phone.message}</p>}
                                    </>
                            }
                            <button
                                className={styles.form__button}
                                onClick={() => handleVerification(authMethod)}
                                type={"button"}
                                disabled={Object.keys(errors).length > 0}
                            >
                                Далее
                            </button>
                        </div>
                    </form>
                )
            }
            {
                verifying && (
                    <form className={styles.form}>
                        <div className={styles.form__header}>
                            <div className={styles.form__title}>Подтвердите номер телефона</div>
                        </div>
                        <div className={styles.form__inputs}>
                            <Controller
                                name='verificationCode'
                                control={control}
                                render={({ field }) => (
                                    <InputMask
                                        mask="9 9 9 9 9 9"
                                        type='text'
                                        placeholder='Код подтверждения'
                                        {...field}
                                    />
                                )} />
                            {errors.verificationCode && <p>{errors.verificationCode.message}</p>}

                        </div>
                        <div>
                            <button
                                className={[styles.form__buttonActive, styles.form__button].join(' ')}
                                type={"button"}
                                onClick={() => onSubmit()}
                                disabled={Object.keys(errors).length > 0}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>
                )
            }
        </ModalLayout>
    );
};

export default ModalAuth;
