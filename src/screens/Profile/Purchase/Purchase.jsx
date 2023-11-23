import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './Purchase.module.scss'
import { useForm, Controller } from 'react-hook-form'
import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";

const Purchase = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, setValue } = useForm()

    const [pol, setPol] = useState([])
    const [priceSegment, setPriceSegment] = useState([])
    const [regularZakaz, setRegularZakaz] = useState([])
    const [sezons, setSezons] = useState([])
    const [sferaPrim, setSferaPrim] = useState([])
    const [tipOdejdy, setTipOdejdy] = useState([])
    const [vidOdejdy, setVidOdejdy] = useState([])
    const [vidPostavki, setVidPostavki] = useState([])
    const [vidProduct, setVidProduct] = useState([])

    /*==============================================*/
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
                const options = await getPropObject('purchase');
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


    return (
        <>
            {/*<Head>*/}
            {/*  <title>Создать заказ - LegpromRF</title>*/}
            {/*</Head>*/}
            <Layout>
                <div className={styles.createOrder}>
                    <TitleProfile>Техническое задание</TitleProfile>

                    <div className={styles.createOrder__header}>
                        <HeaderProfile title="Изделие" number="1" href='/profile/order/createorder/' active={true}/>
                        <HeaderProfile title="Закупка" number="2" href='/profile/order/purchase' active={false}/>
                        <HeaderProfile title="Технология" number="3" href='/profile/order/technology' active={false}/>
                        <HeaderProfile title="Условия" number="4" href='/profile/order/conditions' active={false}/>
                        <HeaderProfile title="Контакты" number="5" href='/profile/order/contacts' active={false}/>
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
                                                    <div className={styles.form__item}>
                                                        <h3 className={styles.form__itemLabel}>Test</h3>
                                                        <Controller
                                                            name="quantity"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input type={"number"} {...field} />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className={styles.form__item}>
                                                        <h3 className={styles.form__itemLabel}>Test</h3>
                                                        <Controller
                                                            name="pricePerItem"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input type={"number"} {...field} />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className={styles.form__item}>
                                                        <h3 className={styles.form__itemLabel}>Test</h3>
                                                        <Controller
                                                            name="budget"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input type={"number"} {...field} />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className={styles.form__item}>
                                                        <h3 className={styles.form__itemLabel}>Test</h3>
                                                        <Controller
                                                            name="price"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input type={"number"} {...field} />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className={styles.form__item}>
                                                        <h3 className={styles.form__itemLabel}>Test</h3>
                                                        <Controller
                                                            name="startFrom"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input type={"date"} {...field} />
                                                            )}
                                                        />
                                                    </div>
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

export default Purchase