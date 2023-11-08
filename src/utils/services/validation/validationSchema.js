import * as yup from "yup";

export const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Введите действительный адрес электронной почты')
        .required('Поле "Email" обязательно'),
    phone: yup
        .string()
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона')
        .required('Поле "Телефон" обязательно'),
    regPassword: yup
        .string()
        .min(6, 'Минимальная длина пароля должна быть 6 символов')
        .required('Поле "Пароль" обязательно'),
    password: yup
        .string()
        .min(6, 'Минимальная длина пароля должна быть 6 символов')
        .required('Поле "Пароль" обязательно'),
    verificationCode: yup
        .string()

}, [['phone', 'email']]);