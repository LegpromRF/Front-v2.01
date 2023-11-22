import styles from "@screens/Profile/CreateOrder/CreateOrder.module.scss";
import OrderFormLayout from "@layout/OrderForm/OrderFormLayout.jsx";
import {useEffect, useMemo, useState} from "react";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

const ProductStep = () => {
    const [pol, setPol] = useState([])
    const [priceSegment, setPriceSegment] = useState([])
    const [regularZakaz, setRegularZakaz] = useState([])
    const [sezons, setSezons] = useState([])
    const [sferaPrim, setSferaPrim] = useState([])
    const [tipOdejdy, setTipOdejdy] = useState([])
    const [vidOdejdy, setVidOdejdy] = useState([])
    const [vidPostavki, setVidPostavki] = useState([])
    const [vidProduct, setVidProduct] = useState([])

    const formInputs = useMemo(() => {
        return {
            pol,
            priceSegment,
            regularZakaz,
            sezons,
            sferaPrim,
            tipOdejdy,
            vidOdejdy,
            vidPostavki,
            vidProduct
        };
    }, [pol, priceSegment, regularZakaz, sezons, sferaPrim, tipOdejdy, vidOdejdy, vidPostavki, vidProduct]);

    const optionStatePairs = [
        [setPol, 'spr_pol'],
        [setPriceSegment, 'spr_price_segment'],
        [setRegularZakaz, 'spr_regular_zakaz'],
        [setSezons, 'spr_sezons'],
        [setSferaPrim, 'spr_sfera_prim'],
        [setTipOdejdy, 'spr_tip_odejdy'],
        [setVidOdejdy, 'spr_vid_odejdy'],
        [setVidPostavki, 'spr_vid_postavki'],
        [setVidProduct, 'spr_vid_product'],
    ]

    useEffect(() => {
        async function loadOptions() {
            try {
                const options = await getPropObject();
                console.log(options);
                const labels = {
                    spr_pol: "Пол",
                    spr_price_segment: "Ценовой сегмент",
                    spr_regular_zakaz: "Обычный заказ",
                    spr_sezons: "Сезоны",
                    spr_sfera_prim: "Сфера применения",
                    spr_tip_odejdy: "Тип одежды",
                    spr_vid_odejdy: "Вид одежды",
                    spr_vid_postavki: "Вид поставки",
                    spr_vid_product: "Вид продукта",
                };

                for (const [setState, propName] of optionStatePairs) {
                    const label = labels[propName] || propName;

                    setState({
                        label,
                        options: options[propName],
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        loadOptions();
    }, []);

    const [visibleLists, setVisibleLists] = useState(Array(6).fill(false));
    const [inputValues, setInputValues] = useState(Array(6).fill('нажмите для выбора'));

    const clickMenu = (index) => (e) => {
        setInputValues(prev => prev.map((value, i) => (i === index ? e.target.innerHTML : value)));
        setVisibleLists(prev => prev.map((value, i) => (i === index ? false : value)));
    };

    const [visibleControlImage, setVisibleControlImage] = useState(false)
    const [preview, setPreview] = useState([]);

    const fileobj= [];

    const changedHandler = (e) => {
        let files = e.target.files;
        fileobj.push(files);
        let reader;

        for (var i = 0; i < fileobj[0].length; i++) {
            reader = new FileReader();
            reader.readAsDataURL(fileobj[0][i]);
            reader.onload = e => {
                preview.push(e.target.result);   // обновить массив вместо замены всего значения превью

                setPreview([...new Set(preview)]); // spread into a new array to trigger rerender
            }
        }
    }

    const deleteImage=(e)=>{
        const index = e.target.id;
        let newPreview = [...preview];
        newPreview.splice(index, 1);

        setPreview(newPreview);
    }

    const { register, handleSubmit, errors, getValues } = useForm()
    // const onSubmit = () => {
    //     // Здесь вы можете отправить данные на сервер или выполнить другие действия
    //     console.log('Отправка данных:', formData);
    //     // Сбросить данные после отправки
    //     // dispatch(setFormData({ name: '', email: '' }));
    //     // dispatch(setStep(1));
    //     // Перенаправить пользователя на другую страницу, если необходимо
    //     // history.push('/other-page');
    // };

    return (
        <OrderFormLayout>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form__content}>
                    {
                        <div className={styles.form__row}>
                            {/*<div className={styles.form__title}>Основная информация</div>*/}
                            <div className={styles.form__items}>
                                {[formInputs.tipOdejdy, formInputs.sferaPrim, formInputs.vidOdejdy, formInputs.pol, formInputs.sezons].map((values, index) => (
                                    <div key={index} className={styles.form__item}>
                                        <h3 className={styles.form__itemLabel}>
                                            <span>{values.label}</span> <span className={styles.form__itemLabel_star}>*</span>
                                        </h3>
                                        <div
                                            onClick={() => setVisibleLists(prev => prev.map((value, i) => (i === index ? !value : value)))}
                                            className={inputValues[index] !== 'нажмите для выбора' ? [styles.form__control, styles.form__controlActiveBlue].join(' ') : styles.form__control}
                                        >
                                            {inputValues[index]}
                                        </div>
                                        <div className={visibleLists[index] ? [styles.form__list, styles.form__list_active].join(' ') : styles.form__list}>
                                            {values.options && Object.entries(values.options).map(([value, num], i) => (
                                                <div key={i} onClick={clickMenu(index, values.options)} className={styles.form__listItem}>
                                                    {value}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </form>
        </OrderFormLayout>
    )
}
export default ProductStep;
