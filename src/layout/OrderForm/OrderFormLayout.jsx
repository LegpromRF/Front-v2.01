// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { setStep, setFormData } from './formSlice';
// import { useHistory } from 'react-router-dom';
// import PurchaseStep from "@layout/OrderForm/steps/purchase.jsx";
import styles from "@screens/Profile/CreateOrder/CreateOrder.module.scss";

const OrderFormLayout = ({ children }) => {

    // const history = useHistory();
    // const { register, handleSubmit, errors, getValues } = useForm();

    //
    // const onSubmit = () => {
    //     // Здесь вы можете отправить данные на сервер или выполнить другие действия
    //     console.log('Отправка данных:', formData);
    //     // Сбросить данные после отправки
    //     dispatch(setFormData({ name: '', email: '' }));
    //     dispatch(setStep(1));
    //     // Перенаправить пользователя на другую страницу, если необходимо
    //     // history.push('/other-page');
    // };



    return (
        <div>
            <div className={styles.createOrder__order}>
                <div className={styles.createOrder__content}>
                    <div className={styles.createOrder__body}>
                        <form className={styles.form}>
                            <div className={styles.form__content}>
                                {children}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderFormLayout;