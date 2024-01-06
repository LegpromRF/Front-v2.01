import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import { updateAndSubmitFormData } from "@store/orderForm/form.slice";
import { useForm } from "react-hook-form";
import NavigateButtons from "../../NavigateButtons";
import SelectItem from "../../FormItems/SelectItem";
import TextItem from "../../FormItems/TextItem";

import styles from "../../CreateOrder.module.scss";

const Contacts = ({ handlePrevStage, handleNextStage }) => {
  const stage = useSelector((state) => state.form.currentStage);
  const isHide = stage != 5
  
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState,
    formState: { errors },
  } = useForm();
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  // const loadOptions = useCallback(async () => {
  //   try {
  //     const options = await getPropObject("statuses");
  //     console.log(options);
  //     const labels = {
  //       status: "Статус",
  //     };

  //     const updatedOptions = Object.entries(labels).map(([propName, label]) => {
  //       return {
  //         propName,
  //         label,
  //         options: options[propName],
  //       };
  //     });

  //     setFormOptions(updatedOptions);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [getPropObject]);

  // useEffect(() => {
  //   loadOptions();
  // }, [loadOptions]);

  async function sendForm(formData) {
    dispatch(updateAndSubmitFormData(getValues()));
    console.log("sendForm");
    // const params = {
    //   photos: ["foo"],
    //   docs: formData.docs,
    //   name: formData.name,
    //   regular_zakaz: formData.regular_zakaz,
    //   vid_postavki: 5,
    //   vid_product: 123,
    //   tip_odejdy: formData.tip_odejdy,
    //   naznach: formData.sfera_prim,
    //   vid_izdeliya: formData.vid_odejdy,
    //   pol: formData.pol,
    //   sezon: formData.sezons,
    //   price_segment: formData.price_segment,
    //   count: formData.count,
    //   price_one: formData.price_one,
    //   price_part: formData.price_part,
    //   price_nds: formData.price_nds,
    //   data_start: new Date(
    //     `${formData.data_start}T00:00:00.000Z`
    //   ).toISOString(),
    //   sroki: formData.sroki,
    //   data_finish: new Date(
    //     `${formData.data_finish}T00:00:00.000Z`
    //   ).toISOString(),
    //   reg_post: formData.reg_post,
    //   reg_prod: formData.reg_prod,
    //   min_part: formData.min_part,
    //   lekala: formData.tz_lekala,
    //   tehnolog: formData.tz_tehnolog,
    //   sirye: formData.tz_sirye,
    //   vid_tkani: formData.vid_tkani,
    //   plotnost_tkani: formData.plotnost_tkani,
    //   nanesen: formData.vid_uslug,
    //   dop_uslugi: formData.dop_uslugi,
    //   razm: formData.razm,
    //   obraz_poshiv: formData.obraz_poshiv,
    //   obraz_pay: formData.obraz_pay,
    //   obraz_zak: formData.obraz_zak,
    //   dost_otk: formData["3variants"],
    //   spsch: formData["3variants"],
    //   count_pers: formData.count_pers,
    //   prersonal: formData.prersonal,
    //   oborud: formData.oborud,
    //   upakovka: formData.upakovka,
    //   markirovka: formData.markirovka,
    //   usl_pay: formData.usl_pay,
    //   usl_priem: formData.usl_priem,
    //   usl_dostav: formData.usl_dostav,
    //   dop_treb: formData.dop_treb,
    //   status: formData.tz_status,
    //   fio: formData.cl_fio,
    //   tel: formData.cl_tel,
    //   email: formData.cl_email,
    //   tlg: formData.tlg,
    // };
    // return axios
    //   .post(apiEndpoints.create, params, {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     console.log(params);
    //     console.log(response);
    //     const bidId = response.data.data;
    //     axios
    //       .post(`${aiEndpoints.rank}?bid_id=${bidId}`, {
    //         timeout: 300000,
    //       })
    //       .then((response) => {
    //         console.log(aiEndpoints.rank);
    //         console.log(response);
    //         dispatch(setSpecification(response.data.data));
    //       });
    //   })
    //   .catch((err) => console.log(err));
  }

  async function setFinalData() {
    try {
      return dispatch(updateFormData(getValues()));
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = () => {
    handleNextStage();
    dispatch(updateAndSubmitFormData(getValues()));
    //   try {
    //     await setFinalData();
    //     dispatch(updateFormData(getValues()));
    //     dispatch(contactsSuccess());
    //     console.log(getValues());
    //     const inputObject = formData;
    //     let outputObject = {};

    //     const processValue = (value) => {
    //       // Если значение - массив, обрабатываем каждый элемент массива
    //       if (Array.isArray(value)) {
    //         return value.map((item) => {
    //           if (typeof item === "object" && "value" in item) {
    //             return item.value;
    //           }
    //           return item;
    //         });
    //       }

    //       // Если значение - объект, рекурсивно вызываем processObject
    //       if (typeof value === "object" && value !== null && "value" in value) {
    //         return value.value;
    //       }

    //       return value;
    //     };

    //     const processObject = (obj) => {
    //       let processedObj = {};

    //       for (const key in obj) {
    //         if (Object.prototype.hasOwnProperty.call(obj, key)) {
    //           const newKey = key.replace(/^(spr_|tz_|cl_)/, ""); // Remove "spr_" from the beginning of the key
    //           processedObj[newKey] = processValue(obj[key]);
    //         }
    //       }

    //       return processedObj;
    //     };

    //     outputObject = processObject(inputObject);
    //     console.log(inputObject);
    //     console.log(outputObject);

    //     await sendForm(outputObject);

    //     // if (outputObject.task.value) {
    //     //   const textFormData = new FormData()
    //     //   textFormData.append('file', outputObject.task.value[0])
    //     //   const textResponse = await axios.post('URL для текстовых документов', textFormData, {
    //     //     headers: {
    //     //       'Content-Type': 'multipart/form-data',
    //     //     }
    //     // }
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  const handleTextFile = useCallback(async (e, field) => {
    try {
      const formData = new FormData();

      const fileLoaded = new Promise((resolve) => {
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append("files", e.target.files[i]);
        }
        console.log(formData);
        console.log(e.target.files);
        resolve();
      });

      await fileLoaded;

      if (fileLoaded) {
        await axios
          .post(apiEndpoints.documents, formData, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            setValue("docs", response.data.data);
          });
        field.onChange(formData);
      }

      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <form
      className={`${styles.form} ${isHide ? styles.form_hide : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.form__content}>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <TextItem
              control={control}
              title="ФИО контактного лица"
              propName="customer_name"
              type="text"
              placeholder="Введите ФИО"
              required
            />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <TextItem
              control={control}
              title="Телефон"
              propName="customer_phone"
              type="tel"
              placeholder="Введите номер телефона"
              required
            />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <TextItem
              control={control}
              title="Email"
              propName="customer_email"
              type="email"
              placeholder="Введите email"
              required
            />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <TextItem
              control={control}
              title="Телеграм"
              propName="customer_tg"
              type="text"
              placeholder="Введите ссылку на TG"
              required
            />
          </div>
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <div>Не все обязательные поля заполнены!</div>
      )}
      <NavigateButtons
        errors={errors}
        handlePrevStage={handlePrevStage}
        stage={5}
      />
    </form>
  );
};
export default Contacts;

//<div className={styles.form__row}>
//  <div className={styles.form__items}>
//    {formOptions.map((values, index) => (
//      <div key={index} className={styles.form__item}>
//        <h3 className={styles.form__itemLabel}>
//          <span>{values.label}</span>
//          {/*<span className={styles.form__itemLabel_star}>*</span>*/}
//        </h3>
//        {values.options && (
//          <Controller
//            name={values.propName}
//            control={control}
//            render={({ field }) => (
//              <Select
//                {...field}
//                options={Object.entries(values.options).map(
//                  ([value, index]) => ({
//                    value: index,
//                    label: value,
//                  })
//                )}
//                styles={{
//                  control: (provided) => ({
//                    ...provided,
//                    width: "100%",
//                  }),
//                }}
//                placeholder="нажмите для выбора"
//                onChange={(selectedOption) =>
//                  field.onChange(selectedOption)
//                }
//              />
//            )}
//          />
//        )}
//      </div>
//    ))}
//  </div>
//</div>

{
  /* <div className={styles.form__item}>
  <h3 className={styles.form__itemLabel}>
    Техзадание (Изображение)
  </h3>
  <Controller
    name="image"
    control={control}
    render={({ field }) => (
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
</div> */
}
