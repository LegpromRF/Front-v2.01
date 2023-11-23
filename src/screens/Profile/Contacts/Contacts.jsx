import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './Contacts.module.scss'
import { useForm, Controller } from 'react-hook-form'
import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import {useDispatch, useSelector} from "react-redux";
import {purchaseSuccess} from "@store/orderForm/form.slice.js";
import Select from "react-select";

const Contacts = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [formOptions, setFormOptions] = useState([]);
  const purchase = useSelector((state) => state.form.purchaseStep);
  const technology = useSelector((state) => state.form.technologyStep);
  const conditions = useSelector((state) => state.form.conditionsStep);
  const contacts = useSelector((state) => state.form.contactsStep);

  const dispatch = useDispatch();

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject('contacts');
      console.log(options);
      const labels = {
        spr_tz_status: 'Статус',
      };

      const updatedOptions = Object.entries(labels).map(([propName, label]) => {
        return {
          label,
          options: options[propName],
        };
      });

      console.log(updatedOptions);

      setFormOptions(updatedOptions);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <>
      <Layout>
        <div className={styles.createOrder}>
          <TitleProfile>Техническое задание</TitleProfile>

          <div className={styles.createOrder__header}>
            <HeaderProfile title="Изделие" number="1" href="/profile/order/createorder/" active={true} />
            <HeaderProfile title="Закупка" number="2" href="/profile/order/purchase" active={purchase} />
            <HeaderProfile title="Технология" number="3" href="/profile/order/technology" active={technology} />
            <HeaderProfile title="Условия" number="4" href="/profile/order/conditions" active={conditions} />
            <HeaderProfile title="Контакты" number="5" href="/profile/order/contacts" active={contacts} />
          </div>

          <div className={styles.createOrder__order}>
            <div className={styles.createOrder__content}>
              <div className={styles.createOrder__body}>
                {formOptions && (
                  <form className={styles.form}>
                    <div className={styles.form__content}>
                      <div className={styles.form__row}>
                        <div className={styles.form__items}>
                          <div className={styles.form__item}>
                            <h3 className={styles.form__itemLabel}>
                              <span>ФИО контактного лица</span> <span className={styles.form__itemLabel_star}>*</span>
                            </h3>
                            <Controller
                                name="nameSurname"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message: 'Это поле обязательно'
                                  },

                                }}
                                render={({ field }) => (
                                    <div>
                                      <input type={"text"} {...field} placeholder="Введите ФИО" />
                                    </div>
                                )}
                            />
                          </div>
                          <div className={styles.form__item}>
                            <h3 className={styles.form__itemLabel}>
                              <span>Телефон</span> <span className={styles.form__itemLabel_star}>*</span>
                            </h3>
                            <Controller
                                name="date"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message: 'Это поле обязательно'
                                  },

                                }}
                                render={({ field }) => (
                                    <div>
                                      <input type={"tel"} {...field} placeholder="Введите номер телефона" />
                                    </div>
                                )}
                            />
                          </div>
                          <div className={styles.form__item}>
                            <h3 className={styles.form__itemLabel}>
                              <span>Email</span> <span className={styles.form__itemLabel_star}>*</span>
                            </h3>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message: 'Это поле обязательно'
                                  },

                                }}
                                render={({ field }) => (
                                    <div>
                                      <input type={"email"} {...field} placeholder="Введите email" />
                                    </div>
                                )}
                            />
                          </div>
                          <div className={styles.form__item}>
                            <h3 className={styles.form__itemLabel}>
                              <span>Телеграм</span> <span className={styles.form__itemLabel_star}>*</span>
                            </h3>
                            <Controller
                                name="telegram"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message: 'Это поле обязательно'
                                  },

                                }}
                                render={({ field }) => (
                                    <div>
                                      <input type={"text"} {...field} placeholder="Введите ссылку на TG" />
                                    </div>
                                )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.form__row}>
                        <div className={styles.form__items}>
                          {formOptions.map((values, index) => (
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
                                                options={Object.entries(values.options).map(([value, num]) => ({
                                                  value,
                                                  label: value,
                                                }))}
                                                styles={{
                                                  control: (provided) => ({
                                                    ...provided,
                                                    width: '100%',
                                                  }),
                                                }}
                                                placeholder="нажмите для выбора"
                                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                            />
                                        )}
                                    />
                                )}
                              </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.form__row}>
                        <div className={styles.form__items}>
                          <div className={styles.form__item}>
                            <h3 className={styles.form__itemLabel}>Техзадание</h3>
                            <Controller
                              name="task"
                              control={control}
                              render={({ field }) => (
                                <div>
                                  <input
                                    type="file"
                                    accept=".docx, .xlsx, .pdf"
                                    aria-label={"Текстовый документ"}
                                    onChange={(e) => {
                                      field.onChange(e.target.files[0]);
                                    }}
                                  />
                                    {field.value && <p>Выбран файл: {field.value.name}</p>}
                                </div>
                              )}
                            />
                          </div>
                            <div className={styles.form__item}>
                              <h3 className={styles.form__itemLabel}>Техзадание</h3>
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                aria-label={"Изображение"}
                                                onChange={(e) => {
                                                    field.onChange(e.target.files[0]);
                                                }}
                                                alt={"Изображение"}
                                            />
                                            {field.value && (
                                                <div>
                                                    <p>Выбрано изображение:</p>
                                                    <img src={URL.createObjectURL(field.value)} alt="Изображение" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.form__content}>
                      <div className={styles.form__row}>
                        <div className={styles.form__items}></div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className={styles.form__button}>
            <div className={styles.form__button}>
              <div className={styles.form__buttonBack}>Назад</div>
              <Link
                onClick={() => {
                  console.log(getValues())
                  dispatch(purchaseSuccess());
                }}
                to="#"
              >
                Вперед
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contacts