import {useEffect} from 'react';
import {createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import styles from "@layout/Modal/ModalAuth/ModalAuth.module.scss";
import {Navigate} from "react-router-dom";
import {loginSuccess} from "@store/auth/auth.slice.js";

const YandexAuth = () => {
    const selectAuthModal = (state) => state.authModal
    const dispatch = useDispatch()
    const selectAuthModalData = createSelector(selectAuthModal, (authModal) => ({
        authMode: authModal.authMode,
    }))

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        const yandexScript = document.createElement('script');
        yandexScript.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
        yandexScript.async = true;
        document.head.appendChild(yandexScript);
        yandexScript.onload = () => {
            window.YaAuthSuggest.init(
                {
                    client_id: 'a6273e01cb89483dbecc90c845a8360a',
                    response_type: 'token',
                },
                `https://legpromrfreact.vercel.app/Yatokenpage`,
                {
                    view: "button",
                    parentId: "yandex",
                    buttonSize: 's',
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
                    console.log('Сообщение с токеном: ', data);
                    dispatch(loginSuccess)
                    document.body.innerHTML += `Сообщение с токеном: ${JSON.stringify(data)}`;
                })
                .catch(function(error) {
                    console.log('Что-то пошло не так: ', error);
                    document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(error)}`;
                });
        };
    }, []);

    return (
        <div
            className={styles.form__ID}
            id="yandex"
        ></div>
    );
};

export default YandexAuth
