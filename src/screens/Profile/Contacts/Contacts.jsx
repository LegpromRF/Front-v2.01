import * as yup from 'yup';
import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './Contacts.module.scss'
import { useForm, Controller } from 'react-hook-form'
import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import {useDispatch, useSelector} from "react-redux";
import {contactsSuccess, updateFormData} from "@store/orderForm/form.slice.js";
import Select from "react-select";
import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";

const Contacts = () => {
  const { control, handleSubmit, getValues, formState: { errors }} = useForm();
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData)

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject('contacts');
      const labels = {
        spr_tz_status: 'Статус',
      };

      const updatedOptions = Object.entries(labels).map(([propName, label]) => {
        return {
          propName,
          label,
          options: options[propName]
        };
      });

      setFormOptions(updatedOptions)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [getPropObject]);

  useEffect(() => {
    loadOptions();
  }, [loadOptions])

  async function sendForm(formData) {
    const params = {
      "photos": [
        "foo"
      ],
      "docs": [
        "foo"
      ],
      "name": formData.name,
      "regular_zakaz": formData.regular_zakaz.value,
      "vid_postavki": 1,
      "vid_product": 0,
      "tip_odejdy": formData.tip_odejdy.value,
      "naznach": 0,
      "vid_izdeliya": 0,
      "pol": 0,
      "sezon": formData.sezons.value,
      "price_segment": [
        0
      ],
      "count": formData.count.value,
      "price_one": formData.price_one.value,
      "price_part": 0,
      "price_nds": formData.price_nds.value,
      "data_start": "2023-11-24T16:02:49.380Z",
      "sroki": formData.sroki,
      "data_finish": "2023-11-24T16:02:49.380Z",
      "reg_post": 0,
      "reg_prod": [
        0
      ],
      "min_part": formData.min_part,
      "lekala": [
        0
      ],
      "tehnolog": [
        0
      ],
      "sirye": [
        0
      ],
      "vid_tkani": [
        0
      ],
      "plotnost_tkani": "string",
      "nanesen": [
        0
      ],
      "dop_uslugi": [
        0
      ],
      "razm": "string",
      "obraz_poshiv": 0,
      "obraz_pay": 0,
      "obraz_zak": true,
      "dost_otk": 0,
      "spsch": 0,
      "count_pers": 0,
      "prersonal": [
        0
      ],
      "oborud": [
        0
      ],
      "upakovka": [
        0
      ],
      "markirovka": [
        0
      ],
      "usl_pay": [
        0
      ],
      "usl_priem": [
        0
      ],
      "usl_dostav": [
        0
      ],
      "dop_treb": "string",
      "status": formData.status,
      "fio": formData.fio,
      "tel": formData.tel,
      "email": formData.email,
      "tlg": formData.tlg,
    }
    return axios.post(apiEndpoints.create, {

    })
  }

  async function setFinalData() {
      try {
        return dispatch(updateFormData(getValues()))
      } catch (error) {
        console.log(error)
      }
  }

  async function onSubmit() {
    try {
      dispatch(updateFormData(getValues()))
      dispatch(contactsSuccess())
      console.log(getValues())
      const inputObject = formData
      let outputObject = {}

      const processValue = (value) => {
        // Если значение - массив, обрабатываем каждый элемент массива
        if (Array.isArray(value)) {
          return value.map((item) => ('value' in item ? item.value : item));
        }

        // Если значение - объект, рекурсивно вызываем processObject
        if (typeof value === 'object' && value !== null && 'value' in value) {
          return value.value;
        }

        return value
      }

      const processObject = (obj) => {
        let processedObj = {};

        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(/^(spr_|tz_|cl_)/, ''); // Remove "spr_" from the beginning of the key
            processedObj[newKey] = processValue(obj[key]);
          }
        }

        return processedObj;
      };

      outputObject = processObject(inputObject)
      console.log(inputObject)
      console.log(outputObject)

      // if (outputObject.task.value) {
      //   const textFormData = new FormData()
      //   textFormData.append('file', outputObject.task.value[0])
      //   const textResponse = await axios.post('URL для текстовых документов', textFormData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     }
      // }
    } catch (error) {
      console.log(error)
    }

  }

  const {purchase, technology, conditions, contacts} = useSelector((state) => state.form);

  return (
    <>
      <Layout>
        <div className={styles.createOrder}>
          <TitleProfile>Техническое задание</TitleProfile>

          <div className={styles.createOrder__header}>
            <HeaderProfile title="Изделие" number="1" href="/profile/order/createorder/" active={true}/>
            <HeaderProfile title="Закупка" number="2" href="/profile/order/purchase" active={purchase}/>
            <HeaderProfile title="Технология" number="3" href="/profile/order/technology" active={technology}/>
            <HeaderProfile title="Условия" number="4" href="/profile/order/conditions" active={conditions}/>
            <HeaderProfile title="Контакты" number="5" href="/profile/order/contacts" active={contacts}/>
          </div>

          <div className={styles.createOrder__order}>
            <div className={styles.createOrder__content}>
              <div className={styles.createOrder__body}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                  <div className={styles.form__content}>
                    <div className={styles.form__row}>
                      <div className={styles.form__items}>
                        <div className={styles.form__item}>
                          <h3 className={styles.form__itemLabel}>
                            <span>ФИО контактного лица</span>
                            {/*<span className={styles.form__itemLabel_star}>*</span>*/}
                          </h3>
                          <Controller
                              name="tz_cl_fio"
                              control={control}
                              rules={{
                                required: {
                                  value: true,
                                  message: 'Это поле обязательно'
                                },
                              }}
                              render={({field}) => (
                                  <div>
                                    <input type={"text"} {...field} placeholder="Введите ФИО" className={styles.form__textField} />
                                    {errors.nameSurname &&
                                        <p className={styles.form__error}>{errors.nameSurname.message}</p>}
                                  </div>
                              )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.form__row}>
                      <div className={styles.form__items}>
                        <div className={styles.form__item}>
                          <div className={styles.form__item}>
                            <h3 className={styles.form__itemLabel}>
                              <span>Телефон</span>
                              {/*<span className={styles.form__itemLabel_star}>*</span>*/}
                            </h3>
                            <Controller
                                name="tz_cl_tel"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message: 'Это поле обязательно'
                                  },
                                }}
                                render={({field}) => (
                                    <div>
                                      <input type={"tel"} {...field} placeholder="Введите номер телефона" className={styles.form__textField} />
                                      {errors.date && <p className={styles.form__error}>{errors.date.message}</p>}
                                    </div>
                                )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.form__row}>
                      <div className={styles.form__items}>
                        <div className={styles.form__item}>
                          <div className={styles.form__item}>
                            <h3 className={styles.form__itemLabel}>
                              <span>Email</span>
                              {/*<span className={styles.form__itemLabel_star}>*</span>*/}
                            </h3>
                            <Controller
                                name="tz_cl_email"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message: 'Это поле обязательно'
                                  },
                                }}
                                render={({field}) => (
                                    <div>
                                      <input type={"email"} {...field} placeholder="Введите email" className={styles.form__textField} />
                                      {errors.email && <p className={styles.form__error}>{errors.email.message}</p>}
                                    </div>
                                )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.form__row}>
                      <div className={styles.form__items}>
                        <div className={styles.form__item}>
                          <div className={styles.form__item}>
                            <h3 className={styles.form__itemLabel}>
                              <span>Телеграм</span>
                              {/*<span className={styles.form__itemLabel_star}>*</span>*/}
                            </h3>
                            <Controller
                                name="cl_tlg"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message: 'Это поле обязательно'
                                  },
                                }}
                                render={({field}) => (
                                    <div>
                                      <input type={"text"} {...field} placeholder="Введите ссылку на TG" className={styles.form__textField} />
                                      {errors.telegram &&
                                          <p className={styles.form__error}>{errors.telegram.message}</p>}
                                    </div>
                                )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.form__row}>
                      <div className={styles.form__items}>
                        {formOptions.map((values, index) => (
                            <div key={index} className={styles.form__item}>
                              <h3 className={styles.form__itemLabel}>
                                <span>{values.label}</span>
                                {/*<span className={styles.form__itemLabel_star}>*</span>*/}
                              </h3>
                              {values.options && (
                                  <Controller
                                      name={values.propName}
                                      control={control}
                                      render={({field}) => (
                                          <Select
                                              {...field}
                                              options={Object.entries(values.options).map(([value, index]) => ({
                                                value: index,
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
                          <h3 className={styles.form__itemLabel}>Техзадание (Описание)</h3>
                          <Controller
                              name="task"
                              control={control}
                              render={({field}) => (
                                  <div>
                                    <input
                                        type="file"
                                        multiple={true}
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
                          <h3 className={styles.form__itemLabel}>Техзадание (Изображение)</h3>
                          <Controller
                              name="image"
                              control={control}
                              render={({field}) => (
                                  <div>
                                    <input
                                        type="file"
                                        multiple={true}
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
                                          {field.value && <p>Выбран файл: {field.value.name}</p>}
                                        </div>
                                    )}
                                  </div>
                              )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.form__button}>
                      <Link
                          to={"/profile/order/conditions"}
                          className={styles.form__buttonBack}
                      >
                        Назад
                      </Link>
                      <button
                          type={"submit"}
                          className={errors ? styles.form__buttonForward : styles.form__buttonForward_disabled}
                      >
                        Вперед
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contacts