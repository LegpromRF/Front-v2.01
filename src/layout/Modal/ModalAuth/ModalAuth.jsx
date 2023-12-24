import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { BeatLoader } from "react-spinners";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthMethod,
  setAuthMode,
  setVerifying,
} from "@/store/auth/authModal.slice.js";
import styles from "./ModalAuth.module.scss";
import { createSelector } from "@reduxjs/toolkit";
import { apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import handleVerification from "@/utils/services/auth/handleVerification.js";
import { validationSchema } from "@/utils/validation/validationSchema.js";
import handleLogin from "@/utils/services/auth/handleLogin.js";
import { loginSuccess } from "@store/auth/auth.slice.js";
import { handleRedirect } from "@store/auth/authModal.slice.js";
import { useCallback, useState } from "react";
import backGround from "../../../../public/Auth/auth_bg.jpg";

const ModalAuth = () => {
  const [loginIssue, setLoginIssue] = useState("");
  const [regIssue, setRegIssue] = useState({ status: null, details: null });
  const [veriIssue, setVeriIssue] = useState({ status: null, details: null });
  const [loader, setLoader] = useState(false);

  const [searchParams] = useSearchParams()
  const fromHomePurchase = searchParams.get('fromHomePurchase') === 'true'

  const selectAuthModal = (state) => state.authModal;
  const selectAuthModalData = createSelector(selectAuthModal, (authModal) => ({
    authMode: authModal.authMode,
    authMethod: authModal.authMethod,
    verifying: authModal.verifying,
    redirectHref: authModal.redirectHref
  }));
  const { authMode, authMethod, verifying, redirectHref } = useSelector(selectAuthModalData);

  const filters = useSelector((state) => state.procRegister.filters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = useCallback(async () => {
    setLoader(true);
    const data = getValues();
    let login = "";
    if (authMethod === "sms") {
      login = data.phone.replace(/\D/g, "");
    } else {
      login = data.email;
    }

    const apiURL = apiEndpoints.register;
    const params = {
      login: login,
      kind: authMethod,
      verification_code: data.verificationCode
        ? data.verificationCode.replace(/\s/g, "")
        : "",
      password: data.regPassword,
    };

    axios
      .post(apiURL, params)
      .then((response) => {
        setVeriIssue({
          status: response.data.status,
          details: response.data.details,
        });
        if (
          response.data.status !== "error" &&
          response.data.details === "Пользователь успешно создан"
        ) {
          dispatch(setVerifying(true));
          Cookies.set("uuid_user", "auth", {
            expires: 10000,
          });
          navigate(redirectHref ? redirectHref : "/profile");
          dispatch(handleRedirect(null))
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => setLoader(false));
  }, [redirectHref])

  const processLogin = useCallback(async (data, authMethod) => {
    setLoader(true);
    const result = await handleLogin(data, authMethod);
    if (result === true) {
      dispatch(loginSuccess());
      setLoader(false);
      navigate(redirectHref ? redirectHref : "/profile");
      dispatch(handleRedirect(null))
    } else {
      setLoader(false);
      setLoginIssue(result);
    }
  }, [redirectHref])
  const handleGetExist = async () => {
    setLoader(true);
    const info = await handleVerification(authMethod, getValues());
    setLoader(false);
    setRegIssue({ status: info.status, details: info.details });
    if (info.status !== "error") {
      dispatch(setVerifying(true));
    }
  };
  return (
    // <ModalLayout>
    <>
      {!verifying && (
        <form className={styles.form}>
          <img src={backGround} alt="back" />
          <div className={styles.form__container}>
            <div className={styles.form__header}>
              <div className={styles.form__title}>
                {authMode === "register" ? "Регистрация" : "Вход"}
              </div>

              <div className={styles.switch}>
                <div
                  className={
                    authMethod === "email"
                      ? `${styles.switch__item_active} ${styles.switch__item}`
                      : styles.switch__item
                  }
                  onClick={() => dispatch(setAuthMethod("email"))}
                >
                  Почта
                </div>
                <div
                  className={
                    authMethod === "sms"
                      ? `${styles.switch__item_active} ${styles.switch__item}`
                      : styles.switch__item
                  }
                  onClick={() => dispatch(setAuthMethod("sms"))}
                >
                  Телефон
                </div>
              </div>
            </div>
            <div className={styles.form__inputs}>
              {authMode === "register" ? (
                <>
                  {authMethod === "email" && (
                    <>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            onInput={() =>
                              setRegIssue({ status: null, details: null })
                            }
                            type="text"
                            placeholder="Почта"
                            {...field}
                          />
                        )}
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                    </>
                  )}
                  {authMethod === "sms" && (
                    <>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <InputMask
                            mask="+7 (999) 999-99-99"
                            type="text"
                            placeholder="Телефон"
                            {...field}
                          />
                        )}
                      />
                      {errors.phone && <p>{errors.phone.message}</p>}
                    </>
                  )}
                  <Controller
                    name="regPassword"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="password"
                        placeholder="Придумайте пароль"
                        {...field}
                      />
                    )}
                  />
                  {errors.regPassword && <p>{errors.regPassword.message} </p>}
                  {regIssue.status === "error" && <p>{regIssue.details}</p>}
                  <button
                    className={styles.form__button}
                    onClick={() => {
                      handleGetExist();
                    }}
                    type={"button"}
                    disabled={Object.keys(errors).length > 0 || loader}
                  >
                    {loader ? <BeatLoader color="rgb(0,54,255)" /> : "Далее"}
                  </button>
                  <div className={styles.form__subtitle}>
                    {authMode === "register"
                      ? "Уже зарегистрированы?"
                      : "Еще нет аккаунта?"}
                    <Link
                      className={styles.form__mode}
                      onClick={() =>
                        dispatch(
                          authMode === "register"
                            ? setAuthMode("login")
                            : setAuthMode("register")
                        )
                      }
                    >
                      {authMode === "register" ? "Войти" : "Зарегистрироваться"}
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {authMethod === "email" ? (
                    <>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input type="text" placeholder="Почта" {...field} />
                        )}
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                    </>
                  ) : (
                    <>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <InputMask
                            mask="+7 (999) 999-99-99"
                            type="text"
                            placeholder="Телефон"
                            {...field}
                          />
                        )}
                      />
                      {errors.phone && <p>{errors.phone.message}</p>}
                    </>
                  )}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input type="password" placeholder="Пароль" {...field} />
                    )}
                  />
                  {errors.password && <p>{errors.password.message} </p>}
                  {loginIssue && <p>{loginIssue}</p>}
                  <button
                    className={styles.form__button}
                    onClick={() => {
                      processLogin(getValues(), authMethod);
                    }}
                    type={"button"}
                    disabled={Object.keys(errors).length > 0 || loader}
                  >
                    {loader ? <BeatLoader color="rgb(0,54,255)" /> : "Войти"}
                  </button>
                  <div className={styles.form__subtitle}>
                    {authMode === "register"
                      ? "Уже зарегистрированы?"
                      : "Еще нет аккаунта?"}
                    <Link
                      className={styles.form__mode}
                      onClick={() =>
                        dispatch(
                          authMode === "register"
                            ? setAuthMode("login")
                            : setAuthMode("register")
                        )
                      }
                    >
                      {authMode === "register" ? "Войти" : "Зарегистрироваться"}
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className={styles.form__footer}>
              {/*<YandexAuth/>*/}
              {/* <VkAuth /> */}
            </div>
          </div>
        </form>
      )}
      {verifying && (
        <form className={styles.form}>
          <img src={backGround} alt="back" />
          <div className={styles.form__container}>
            <div className={styles.form__header}>
              <div className={styles.form__title}>
                {authMethod === "sms"
                  ? "Подтвердите номер телефона"
                  : "Подтвердите почту"}
              </div>
            </div>
            <div className={styles.form__inputs}>
              <Controller
                name="verificationCode"
                control={control}
                render={({ field }) => (
                  <InputMask
                    mask="9 9 9 9 9 9"
                    type="text"
                    placeholder="Код подтверждения"
                    {...field}
                  />
                )}
              />
              {errors.verificationCode && (
                <p>{errors.verificationCode.message}</p>
              )}
              {veriIssue.status === "error" && <p>{veriIssue.details}</p>}
            </div>
            <div>
              <button
                className={[
                  styles.form__buttonActive,
                  styles.form__button,
                ].join(" ")}
                type={"button"}
                onClick={onSubmit}
                disabled={Object.keys(errors).length > 0 || loader}
              >
                {loader ? (
                  <BeatLoader color="rgb(0,54,255)" />
                ) : (
                  "Зарегистрироваться"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
    // </ModalLayout>
  );
};

export default ModalAuth;
