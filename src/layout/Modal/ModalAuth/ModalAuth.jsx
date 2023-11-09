import axios from 'axios'

import { yupResolver } from '@hookform/resolvers/yup';

import {Controller, useForm} from "react-hook-form";

import InputMask from 'react-input-mask';

import {useDispatch, useSelector} from "react-redux";
import {setAuthMethod, setAuthMode, toggleModal} from "@/store/auth/authModal.slice.js";
import ModalLayout from '@layout/Modal/ModalLayout.jsx';
import styles from './ModalAuth.module.scss';
import {createSelector} from "@reduxjs/toolkit";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import {Link, Navigate} from "react-router-dom";
import VkAuth from "@components/Auth/VK/VkAuth.jsx";
import handleVerification from "@/utils/services/auth/verficationCode.js";
import {validationSchema} from "@/utils/validation/validationSchema.js";
import YandexAuth from "@components/Auth/Yandex/YandexAuth.jsx";
import handleLogin from "@/utils/services/auth/handleLogin.js";



const ModalAuth = () => {

    const selectAuthModal = (state) => state.authModal
    const selectAuthModalData = createSelector(selectAuthModal, (authModal) => ({
        authMode: authModal.authMode,
        authMethod: authModal.authMethod,
        verifying: authModal.verifying,
    }))
    const { authMode, authMethod, verifying } = useSelector(selectAuthModalData)
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const dispatch = useDispatch();

    const {
        control,
        formState: { errors },
        getValues
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

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
                <form className={styles.form}>
                    <div className={styles.form__header}>
                        <div className={styles.form__title}>
                            {authMode === 'register' ? 'Регистрация' : 'Вход'}
                        </div>
                        <div
                            className={styles.form__subtitle}
                        >
                            {authMode === 'register' ? 'Уже зарегистрированы?' : 'Еще нет аккаунта?'}
                            <Link
                                className={styles.form__mode}
                                onClick={() => dispatch(authMode === 'register'? setAuthMode('login') : setAuthMode('register'))}
                            >
                                {authMode === 'register' ? 'Войти'  : 'Зарегистрироваться'}
                            </Link>
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
                            authMode === 'register'?
                                <>
                                    {
                                        authMethod === 'email' &&
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
                                    }
                                    {
                                        authMethod === 'sms' &&
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
                                        name='regPassword'
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type='password'
                                                placeholder='Придумайте пароль'
                                                {...field}
                                            />
                                        )} />
                                    {errors.regPassword && <p>{errors.regPassword.message} </p>}
                                    <button
                                        className={styles.form__button}
                                        onClick={() => handleVerification(authMethod, getValues())}
                                        type={"button"}
                                        disabled={Object.keys(errors).length > 0}
                                    >
                                        Далее
                                    </button>
                                </>
                                :
                                <>
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
                                                placeholder='Пароль'
                                                {...field}
                                            />
                                        )} />
                                    {errors.password && <p>{errors.password.message} </p>}
                                    <button
                                        className={styles.form__button}
                                        onClick={() => {
                                            console.log('pushed')
                                            handleLogin(getValues(), authMethod)
                                        }}
                                        type={"button"}
                                        disabled={Object.keys(errors).length > 0}
                                    >
                                        Войти
                                    </button>
                                </>
                        }

                    </div>
                    <div className={styles.form__footer}>
                        <YandexAuth />
                        <VkAuth />
                    </div>
                </form>
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
            {
                isAuthenticated && <Navigate to={'/profile/home'} />
            }
        </ModalLayout>
    );
};

export default ModalAuth;
