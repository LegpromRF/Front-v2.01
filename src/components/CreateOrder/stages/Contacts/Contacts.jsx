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
import { getFormField } from "../../../../store/orderForm/form.slice";
import PhoneArea from "./PhoneArea";

const Contacts = ({ handlePrevStage }) => {
  const stage = useSelector((state) => state.form.currentStage);
  const isHide = stage != 5;
  const isPhotoUrlsExist = Boolean(getFormField("photo_urls")?.length);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!isPhotoUrlsExist) return;
    dispatch(updateAndSubmitFormData(getValues()));
  }, [isPhotoUrlsExist]);

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
