import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import NavigateButtons from "../../NavigateButtons";
import TextItem from "../../FormItems/TextItem";
import SelectItem from "../../FormItems/SelectItem";
import ImagesUpload from "./ImagesUpload";
import { updateFormData } from "@store/orders/form.slice";

import styles from "../../CreateOrder.module.scss";
import { useNavigate } from "react-router-dom";
import { loadFormForEdit, setStageFields, submitForm } from "../../../../store/orders/form.slice";
import FilesUpload from "../Technology/FilesUpload";
import NameArea from "./NameArea";
import StatusItem from "./StatusItem";
import { requiredFields } from "../../../../store/orders/utils";

const Product = ({ handleNextStage, formSubmitRef }) => {
  const {currentStage: stage, isFormFetchingSuccess, isEditMode, formData} = useSelector((state) => state.form);
  
  const isHide = stage != 1;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch
  } = useForm();

  const [formOptions, setFormOptions] = useState([]);
  const [isPhotosWatch, setPhotosWatch] = useState(false);

  const photoUrlsRef = useRef(null)

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject("product");
      // if (!options) navigate('/404')

      const labels = {
        clothes_type: "Тип одежды",
        purpose: "Назначение",
        clothes_name: "Вид изделия",
        gender_and_age: "Пол и возраст",
        season: "Сезон",
        price_segment: "Ценовой сегмент",
        regularity_of_order: "Регулярность заказа",
        product_type: "Вид продукции",
        status: "Статус",
      };

      const updatedOptions = Object.entries(labels).map(([propName, label]) => {
        return {
          propName,
          label,
          options: options[propName],
        };
      });
      
      setFormOptions(updatedOptions);
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    // console.log(isEditMode);
    if (!isEditMode) dispatch(updateFormData(getValues()));
  }, [isEditMode])

  useEffect(() => {
    dispatch(setStageFields({ name: 'product', fields: [...Object.keys(getValues()), 'photo_urls']}))

    watch((formValues, changes) => {
      // console.log('changes:', changes, formValues);
      if (changes.name) {
        dispatch(updateFormData(({ [changes.name]: changes.values[changes.name] })));
      }
    //   if (Object.values(formValues).length > 0) dispatch(updateFormData(formValues));
    })
  }, [])
  
  const onSubmit = () => {
    // console.log(photoUrlsRef.current);
    if (requiredFields.includes('photo_urls') && !photoUrlsRef.current.length) {
      setPhotosWatch(true)
      return
    }
    handleNextStage();
    dispatch(updateFormData(getValues()));
  }

  const formSubmit = handleSubmit(onSubmit)
  formSubmitRef.current = formSubmit

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    // console.log('formData, getValues()', formData, getValues());
  }, [])
  
  return (
    <form
      className={`${styles.form} ${isHide ? styles.form_hide : ""}`}
      onSubmit={formSubmit}
    >
      <div className={styles.form__content}>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <NameArea control={control} setValue={setValue} />
            <StatusItem control={control} formOptions={formOptions} />
            {/* <FilesUpload control={control} /> */}
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__title}>Основная информация</div>
          <div className={styles.form__items}>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Тип одежды"
              propName="clothes_type"
              required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Назначение"
              propName="purpose"
              required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Вид изделия"
              propName="clothes_name"
              required
            />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Пол и возраст"
              propName="gender_and_age"
              isMulti
              required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Сезон"
              propName="season"
              required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Ценовой сегмент"
              propName="price_segment"
              isMulti
              required
            />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Регулярность заказа"
              propName="regularity_of_order"
              required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Вид продукции"
              propName="product_type"
              required
            />
            {/* <FilesUpload watch={watch} control={control} /> */}
          </div>
        </div>
        <ImagesUpload control={control} photoUrlsRef={photoUrlsRef} />
      </div>
      {(Object.keys(errors).length > 0 || (isPhotosWatch && !photoUrlsRef.current.length)) && (
        <p className={styles.form__errorMess}>
          Не все обязательные поля заполнены!
        </p>
      )}
      <NavigateButtons errors={errors} />
    </form>
  );
};
export default Product;
