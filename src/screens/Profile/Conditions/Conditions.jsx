import { Link } from 'react-router-dom';
import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './Conditions.module.scss'
import { useForm, Controller } from 'react-hook-form'
import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import {useEffect, useState} from "react";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import Select from "react-select";

const Conditions = () => {
    const { control, handleSubmit, setValue } = useForm()
    const [formOptions, setFormOptions] = useState([])

    async function loadOptions() {
        try {
            const options = await getPropObject('conditions');
            console.log(options);
            const labels = {
                spr_3variants: "Пол",
                spr_prersonal: "Ценовой сегмент",
                spr_oborud: "Обычный заказ",
                spr_upakovka: "Сезоны",
                spr_markirovka: "Сфера применения",
            }

            const updatedOptions = Object.entries(labels).map(([propName, label]) => {
                return {
                    label,
                    options: options[propName]
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
                        <HeaderProfile title="Изделие" number="1" href='/profile/order/createorder/' active={true}/>
                        <HeaderProfile title="Закупка" number="2" href='/profile/order/purchase' active={false}/>
                        <HeaderProfile title="Технология" number="3" href='/profile/order/technology' active={false}/>
                        <HeaderProfile title="Условия" number="4" href='/profile/order/conditions' active={false}/>
                        <HeaderProfile title="Контакты" number="5" href='/profile/order/contacts' active={false}/>
                    </div>

                    <div className={styles.createOrder__order}>
                        <div className={styles.createOrder__content}>
                            <div className={styles.createOrder__body}>
                                {
                                    <form className={styles.form}>
                                        <div className={styles.form__content}>
                                            <div className={styles.form__row}>
                                                <div className={styles.form__items}>
                                                    {formOptions && formOptions.map((values, index) => (
                                                        <div key={index} className={styles.form__item}>
                                                            <h3 className={styles.form__itemLabel}>
                                                                <span>{values.label}</span> <span className={styles.form__itemLabel_star}>*</span>
                                                            </h3>
                                                            {values.options && (
                                                                <Controller
                                                                    name={`productData[${index}]`}
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            {...field}
                                                                            options={
                                                                                Object.entries(values.options).map(([value, num]) => ({
                                                                                    value,
                                                                                    label: value,
                                                                                }))
                                                                            }
                                                                            styles={{
                                                                                control: (provided) => ({
                                                                                    ...provided,
                                                                                    width: '100%', // Устанавливайте нужную вам ширину
                                                                                }),
                                                                            }}
                                                                            placeholder="нажмите для выбора"
                                                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                        />
                                                                    )}
                                                                />
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

export default Conditions