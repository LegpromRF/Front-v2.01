import { Link } from 'react-router-dom';
// import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './Technology.module.scss'
import { useForm, Controller } from 'react-hook-form'
import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import Select from "react-select";

const headers = [
    { title: "Изделие", number: "1", href: '/profile/createorder/', active: true },
    { title: "Закупка", number: "2", href: '/profile/purchase', active: false },
    { title: "Технология", number: "3", href: '/profile/technology', active: false },
    { title: "Условия", number: "4", href: '/profile/conditions', active: false },
    { title: "Контакты", number: "5", href: '/profile/contacts', active: false },
];

const HeaderProfile = ({ title, href, number, active }) => {
    return (
        <div className={styles.header}>
            <div className={active ? [styles.header__item, styles.header__item_active].join(' ') : styles.header__item}>
                <Link to={href}>
                    <span>{title}</span>
                    <div className={active ? [styles.header__itemNumber, styles.header__itemNumber_active].join(' ') : styles.header__itemNumber}>
                        {number}
                    </div>
                </Link>
            </div>
        </div>
    );
}

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
                    spr_dop_uslugi: "Пол",
                    spr_obraz_pay: "Ценовой сегмент",
                    spr_obraz_poshiv: "Обычный заказ",
                    spr_tz_sirye: "Сезоны",
                    spr_tz_tehnolog: "Сфера применения",
                    spr_vid_tkani: "Тип одежды",
                    spr_vid_uslug: "Вид одежды",
                }

                const updatedOptions = Object.entries(labels).map(([propName, label]) => {
                    return {
                        label,
                        options: options[propName],
                    };
                });

                console.log(updatedOptions)

                setFormOptions(updatedOptions)

            } catch (error) {
                console.log(error);
            }
        }
        console.log(formOptions)
        loadOptions();
    }, []);

    return (
        <>
            {/*<Head>*/}
            {/*  <title>Создать заказ - LegpromRF</title>*/}
            {/*</Head>*/}
            <Layout>
                <div className={styles.createOrder}>
                    <TitleProfile>Техническое задание</TitleProfile>

                    <div className={styles.createOrder__header}>
                        {headers.map((header, index) => (
                            <HeaderProfile
                                key={index}
                                title={header.title}
                                number={header.number}
                                href={header.href}
                                active={header.active}
                            />
                        ))}
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
                                                    {/*{formOptions.map((values, index) => (*/}
                                                    {/*    <div key={index} className={styles.form__item}>*/}
                                                    {/*        <h3 className={styles.form__itemLabel}>*/}
                                                    {/*            <span>Test</span> <span className={styles.form__itemLabel_star}>*</span>*/}
                                                    {/*        </h3>*/}
                                                    {/*        {values.options && (*/}
                                                    {/*            values.options*/}
                                                    {/*        )}*/}
                                                    {/*        /!*<div*!/*/}
                                                    {/*        /!*    onClick={() => setVisibleLists(prev => prev.map((value, i) => (i === index ? !value : value)))}*!/*/}
                                                    {/*        /!*    className={inputValues[index] !== 'нажмите для выбора' ? [styles.form__control, styles.form__controlActiveBlue].join(' ') : styles.form__control}*!/*/}
                                                    {/*        /!*>*!/*/}
                                                    {/*        /!*    {inputValues[index]}*!/*/}
                                                    {/*        /!*</div>*!/*/}
                                                    {/*        /!*<div className={visibleLists[index] ? [styles.form__list, styles.form__list_active].join(' ') : styles.form__list}>*!/*/}

                                                    {/*        /!*</div>*!/*/}

                                                    {/*    </div>*/}
                                                    {/*))}*/}
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
                        <Link to="/profile/order/technology">
                            Вперед
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Technology