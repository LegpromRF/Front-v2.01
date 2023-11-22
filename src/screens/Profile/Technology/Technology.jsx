import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './Technology.module.scss'
import { useForm, Controller } from 'react-hook-form'
import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import Select from "react-select";

const Technology = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, setValue } = useForm()

    const [formOptions, setFormOptions] = useState({})

    useEffect(() => {
        async function loadOptions() {
            try {
                const options = await getPropObject('technology');
                console.log(options);
                const labels = {
                    spr_tz_lekala: "Пол",
                    spr_tz_tehnolog: "Ценовой сегмент",
                    spr_tz_sirye: "Обычный заказ",
                    spr_vid_tkani: "Сезоны",
                    spr_vid_uslug: "Сфера применения",
                    spr_dop_uslug: "Тип одежды",
                    spr_obraz_poshiv: "Вид одежды",
                    spr_obraz_pay: "Вид поставки",
                }

                const updatedOptions = Object.entries(labels).map(([propName, label]) => {
                    return {
                        label,
                        options: options[propName] || {}, // Здесь можно добавить проверку на наличие options[propName] и предпринять дополнительные действия, если это необходимо
                    };
                });

                setFormOptions(updatedOptions)
            } catch (error) {
                console.log(error);
            }
        }

        loadOptions();
    }, []);

    const formInputs = useMemo(() => {
        return formOptions
    }, [formOptions]);


    return (
        <>
            {/*<Head>*/}
            {/*  <title>Создать заказ - LegpromRF</title>*/}
            {/*</Head>*/}
            <Layout>
                <div className={styles.createOrder}>
                    <TitleProfile>Техническое задание</TitleProfile>

                    <div className={styles.createOrder__header}>
                        <HeaderProfile title="Изделие" number="1" href='/profile/createorder/' active={true}/>
                        <HeaderProfile title="Закупка" number="2" href='/profile/purchase' active={false}/>
                        <HeaderProfile title="Технология" number="3" href='/profile/technology' active={false}/>
                        <HeaderProfile title="Условия" number="4" href='/profile/conditions' active={false}/>
                        <HeaderProfile title="Контакты" number="5" href='/profile/contacts' active={false}/>
                    </div>

                    <div className={styles.createOrder__order}>
                        {/*<div className={styles.createOrder__type}>*/}
                        {/*    <div className={styles.createOrder__typeTitle}>Вид продукции</div>*/}
                        {/*</div>*/}
                        <div className={styles.createOrder__content}>
                            <div className={styles.createOrder__body}>
                                {
                                    <form className={styles.form}>
                                        <div className={styles.form__content}>
                                            <div className={styles.form__row}>
                                                <div className={styles.form__items}>
                                                    {formInputs.map((values, index) => (
                                                        <div key={index} className={styles.form__item}>
                                                            <h3 className={styles.form__itemLabel}>
                                                                <span>Test</span> <span className={styles.form__itemLabel_star}>*</span>
                                                            </h3>
                                                            {values.options && (
                                                                values.options
                                                            )}
                                                            {/*<div*/}
                                                            {/*    onClick={() => setVisibleLists(prev => prev.map((value, i) => (i === index ? !value : value)))}*/}
                                                            {/*    className={inputValues[index] !== 'нажмите для выбора' ? [styles.form__control, styles.form__controlActiveBlue].join(' ') : styles.form__control}*/}
                                                            {/*>*/}
                                                            {/*    {inputValues[index]}*/}
                                                            {/*</div>*/}
                                                            {/*<div className={visibleLists[index] ? [styles.form__list, styles.form__list_active].join(' ') : styles.form__list}>*/}

                                                            {/*</div>*/}

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.form__content}>
                                            <div className={styles.form__row}>
                                                <div className={styles.form__items}>
                                                    <div className={styles.form__item}>
                                                        <h3 className={styles.form__itemLabel}>Test</h3>
                                                        <Controller
                                                            name="timing"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input type={"number"} {...field} />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className={styles.form__item}>
                                                        <h3 className={styles.form__itemLabel}>Test</h3>
                                                        <Controller
                                                            name="giveUntil"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input type={"date"} {...field} />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className={styles.form__item}>
                                                        <h3 className={styles.form__itemLabel}>Test</h3>
                                                        <Controller
                                                            name="getPartly"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input type={"number"} {...field} />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.form__button}>
                        <div className={styles.form__buttonBack}>Назад</div>
                        <button
                            onClick={() => {
                                navigate('/profile/order/technology')
                            }}
                        >
                            Вперед
                        </button>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Technology