import { Link } from 'react-router-dom';
import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './Conditions.module.scss'
import { useForm, Controller } from 'react-hook-form'
import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import {useEffect, useState} from "react";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {conditionsSuccess} from "@store/orderForm/form.slice.js";

const Conditions = () => {
    const { control, handleSubmit, setValue } = useForm()
    const [formOptions, setFormOptions] = useState([])

    const purchase = useSelector((state) => state.form.purchaseStep)
    const technology = useSelector((state) => state.form.technologyStep)
    const conditions = useSelector((state) => state.form.conditionsStep)
    const contacts = useSelector((state) => state.form.contactsStep)

    const dispatch = useDispatch()

    async function loadOptions() {
        try {
            const options = await getPropObject('conditions');
            console.log(options);
            const labels = {
                spr_3variants: "Доступ на производство для ОТК заказчика",
                spr_prersonal: "Требования к персоналу",
                spr_oborud: "Требования к оборудованию",
                spr_upakovka: "Требования к упаковке",
                spr_markirovka: "Требования к маркировке",
                spr_usl_pay: "Условия оплаты",
                spr_usl_priem: "Условия приемки",
                spr_usl_dostav: "Условия доставки"
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
                        <HeaderProfile title="Закупка" number="2" href='/profile/order/purchase' active={purchase}/>
                        <HeaderProfile title="Технология" number="3" href='/profile/order/technology' active={technology}/>
                        <HeaderProfile title="Условия" number="4" href='/profile/order/conditions' active={conditions}/>
                        <HeaderProfile title="Контакты" number="5" href='/profile/order/contacts' active={contacts}/>
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
                                                                            onChange={(selectedOption) => field.onChange(selectedOption)}                                                                        />
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
                        <Link
                            onClick={() => {
                                dispatch(conditionsSuccess())
                            }}
                            to="/profile/order/contacts"
                        >
                            Вперед
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Conditions