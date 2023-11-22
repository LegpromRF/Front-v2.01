import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { setStep, setFormData } from './formSlice';
// import { useHistory } from 'react-router-dom';
import styles from "@screens/Profile/CreateOrder/CreateOrder.module.scss";
import {useState} from "react";
import ProductStep from "@layout/OrderForm/steps/product.jsx";

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

    const [typeActive1, setTypeActive1] = useState(false)
    const [typeActive2, setTypeActive2] = useState(false)

    const handleTypeClick = (type) => {
        setTypeActive1(type === 1 && !typeActive1);
        setTypeActive2(type === 2 && !typeActive2);
    }

    return (
        <div>
            <div className={styles.createOrder__order}>
                <div className={styles.createOrder__type}>
                    <div className={styles.createOrder__typeTitle}>Вид продукции</div>
                    {
                        formInputs.vidProduct.options && Object.entries(formInputs.vidProduct.options).map(([value, num], index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleTypeClick(index)}
                                    className={typeActive === index ? [styles.createOrder__typeItem, styles.createOrder__typeItem_active].join(' ')
                                        :
                                        styles.createOrder__typeItem}
                                >
                                    {value}
                                </div>
                            )
                        })
                    }
                    {/*{typeActive1 || typeActive2 */}
                    {/*  ?*/}
                    {/*    <div className={styles.createOrder__typeWarning}>От вида продукции зависят остальные параметры заказа.</div>*/}
                    {/*  :*/}
                    {/*    null*/}
                    {/*}*/}
                </div>
                <div className={styles.createOrder__content}>
                    <div className={styles.createOrder__body}>
                        {children}
                    </div>
                </div>
            </div>
            <div className={styles.form__button}>
                <div className={styles.form__buttonBack}>Назад</div>
                <button
                    onClick={() => setModalActive(!modalActive)}
                    disabled={!(activeInput1 && activeInput2
                        && valueInput1 !== 'нажмите для выбора' &&
                        valueInput2 !== 'нажмите для выбора' && valueInput3 !== 'нажмите для выбора'
                        && valueInput4 !== 'нажмите для выбора')
                    }
                    className={activeInput1 && activeInput2
                    && valueInput1 !== 'нажмите для выбора' &&
                    valueInput2 !== 'нажмите для выбора' && valueInput3 !== 'нажмите для выбора'
                    && valueInput4 !== 'нажмите для выбора' ? [styles.form__buttonForward, styles.form__buttonForwardActive].join(' ') : styles.form__buttonForward}>
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default OrderFormLayout;