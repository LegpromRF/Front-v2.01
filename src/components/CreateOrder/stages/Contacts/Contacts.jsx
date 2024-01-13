import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import { useForm } from "react-hook-form";
import NavigateButtons from "../../NavigateButtons";
import SelectItem from "../../FormItems/SelectItem";
import TextItem from "../../FormItems/TextItem";

import styles from "../../CreateOrder.module.scss";
import { clearData, getFormField, setStageFields, submitForm, updateFormData } from "../../../../store/orders/form.slice";
import PhoneArea from "./PhoneArea";
import { useNavigate } from "react-router-dom";

const Contacts = ({ handlePrevStage, formSubmitRef, totalFormSubmitting }) => {
  const {currentStage: stage, isFormFetchingSuccess, isEditMode} = useSelector((state) => state.form);
  const isHide = stage != 5;
  // const isPhotoUrlsExist = Boolean(getFormField("photo_urls")?.length);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEditMode) dispatch(updateFormData(getValues()));
  }, [isEditMode])
  
  useEffect(() => {
    dispatch(setStageFields({ name: 'contacts', fields: Object.keys(getValues())}))
    
    watch((formValues, changes) => {
      if (changes.name) {
        dispatch(updateFormData(({ [changes.name]: changes.values[changes.name] })));
      }
    })
  }, [])

  const onSubmit = () => {
    dispatch(updateFormData(getValues()));
    dispatch(submitForm());
  }

  const formSubmit = handleSubmit(onSubmit)
  formSubmitRef.current = formSubmit

  useEffect(() => {
    if (isFormFetchingSuccess === true || isFormFetchingSuccess === false) navigate('/profile/order/all')
    // reset()
  }, [isFormFetchingSuccess])
  
  return (
    <form
      className={`${styles.form} ${isHide ? styles.form_hide : ""}`}
      onSubmit={formSubmit}
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
            <PhoneArea control={control} />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <TextItem
              control={control}
              title="Telegram"
              propName="customer_tg"
              type="text"
              placeholder="Введите телеграм аккаунт"
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
            />
          </div>
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <p className={styles.form__errorMess}>
          Не все обязательные поля заполнены!
        </p>
      )}
      <NavigateButtons
        errors={errors}
        handlePrevStage={handlePrevStage}
        formSubmitting={totalFormSubmitting}
        stage={5}
      />
    </form>
  );
};

export default Contacts;
