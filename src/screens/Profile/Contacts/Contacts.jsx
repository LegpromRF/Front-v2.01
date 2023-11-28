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
import {aiEndpoints, aiEndPoints, apiEndpoints} from "@/utils/constants/apiEndpoints.js";
import {setSpecification} from "@store/session/userdata.slice.js";

const Contacts = () => {
  const {
      control,
      watch,
      handleSubmit,
      getValues,
      setValue,
      formState: { errors }
  } = useForm();
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData)

  const purchase = useSelector((state) => state.form.purchaseStep)
  const technology = useSelector((state) => state.form.technologyStep)
  const conditions = useSelector((state) => state.form.conditionsStep)
  const contacts = useSelector((state) => state.form.contactsStep)

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
      "regular_zakaz": formData.regular_zakaz,
      "vid_postavki": 5,
      "vid_product": 123,
      "tip_odejdy": formData.tip_odejdy,
      "naznach": formData.sfera_prim,
      "vid_izdeliya": formData.vid_odejdy,
      "pol": formData.pol,
      "sezon": formData.sezons,
      "price_segment": formData.price_segment,
      "count": formData.count,
      "price_one": formData.price_one,
      "price_part": formData.price_part,
      "price_nds": formData.price_nds,
      "data_start": new Date(`${formData.data_start}T00:00:00.000Z`).toISOString(),
      "sroki": formData.sroki,
      "data_finish": new Date(`${formData.data_finish}T00:00:00.000Z`).toISOString(),
      "reg_post": formData.reg_post,
      "reg_prod": formData.reg_prod,
      "min_part": formData.min_part,
      "lekala": formData.tz_lekala,
      "tehnolog": formData.tz_tehnolog,
      "sirye": formData.tz_sirye,
      "vid_tkani": formData.vid_tkani,
      "plotnost_tkani": formData.plotnost_tkani,
      "nanesen": formData.vid_uslug,
      "dop_uslugi": formData.dop_uslugi,
      "razm": formData.razm,
      "obraz_poshiv": formData.obraz_poshiv,
      "obraz_pay": formData.obraz_pay,
      "obraz_zak": formData.obraz_zak,
      "dost_otk": formData['3variants'],
      "spsch": formData['3variants'],
      "count_pers": formData.count_pers,
      "prersonal": formData.prersonal,
      "oborud": formData.oborud,
      "upakovka": formData.upakovka,
      "markirovka": formData.markirovka,
      "usl_pay": formData.usl_pay,
      "usl_priem": formData.usl_priem,
      "usl_dostav": formData.usl_dostav,
      "dop_treb": formData.dop_treb,
      "status": formData.tz_status,
      "fio": formData.cl_fio,
      "tel": formData.cl_tel,
      "email": formData.cl_email,
      "tlg": formData.tlg,
    }
    return axios.post(apiEndpoints.create, params, {
      withCredentials: true
    })
        .then((response) => {
          console.log(params)
          console.log(response)
          const bidId = response.data.data
          axios
              .post(`${aiEndpoints.rank}?bid_id=${bidId}`)
              .then((response) => {
                console.log(aiEndpoints.rank)
                console.log(response)
                dispatch(setSpecification(response.data.data))
              })
        })
        .catch((err) => console.log(err))
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
      await setFinalData()
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

      await sendForm(outputObject)

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

  const handleTextFile = useCallback( async (e, field) => {
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])

      const fileLoaded = new Promise((resolve) => {
        formData.append('file', e.target.files[0]);
        resolve();
      });

      await fileLoaded;

      console.log(formData)
      await axios.post(apiEndpoints.documents, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
          .then((response) => {
            console.log(response)
          })
      field.onChange(formData)
    } catch (error) {
      console.log(error)
    }

  }, [])

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
                                          handleTextFile(e, field)
                                        }}
                                    />
                                    {
                                      watch('task') && (field.value && <p>Выбран файл: {field.value.name}</p>)
                                    }
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