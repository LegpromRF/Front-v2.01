import { Link } from 'react-router-dom';
import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './Technology.module.scss'
import { useForm, Controller } from 'react-hook-form'
import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";

const Technology = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, setValue } = useForm()

    const [formOptions, setFormOptions] = useState({})

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

    useEffect(() => {
        loadOptions();
    }, []);

    return (
        <>
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
                        <div className={styles.createOrder__content}>
                            <div className={styles.createOrder__body}>
                                {
                                    <form className={styles.form}>
                                        <div className={styles.form__content}>
                                            <div className={styles.form__row}>
                                                <div className={styles.form__items}>
                                                    {formOptions.map((values, index) => (
                                                        <div key={index} className={styles.form__item}>
                                                            <h3 className={styles.form__itemLabel}>
                                                                <span>{values.label}</span> <span className={styles.form__itemLabel_star}>*</span>
                                                            </h3>
                                                            {values.options && (
                                                                values.options
                                                            )}
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