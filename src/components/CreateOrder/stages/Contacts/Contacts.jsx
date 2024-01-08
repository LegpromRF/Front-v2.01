import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import { useForm } from "react-hook-form";
import NavigateButtons from "../../NavigateButtons";
import SelectItem from "../../FormItems/SelectItem";
import TextItem from "../../FormItems/TextItem";

import styles from "../../CreateOrder.module.scss";
import { clearData, getFormField, submitForm, updateFormData } from "../../../../store/orders/form.slice";
import PhoneArea from "./PhoneArea";
import { useNavigate } from "react-router-dom";

const Contacts = ({ handlePrevStage }) => {
  const isFormFetchingSuccess = useSelector((state) => state.form.isFormFetchingSuccess);
  const stage = useSelector((state) => state.form.currentStage);
  const isHide = stage != 5;
  const isPhotoUrlsExist = Boolean(getFormField("photo_urls")?.length);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!isPhotoUrlsExist) return;
    dispatch(updateFormData(getValues()));
    dispatch(submitForm());
  }, [isPhotoUrlsExist]);

  useEffect(() => {
    reset()
  }, [isFormFetchingSuccess])
  
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
            <PhoneArea control={control} />
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
      </div>
      {Object.keys(errors).length > 0 && (
        <p className={styles.form__errorMess}>
          Не все обязательные поля заполнены!
        </p>
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
