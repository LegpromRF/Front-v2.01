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
import { loadFormForEdit, submitForm } from "../../../../store/orders/form.slice";

const Product = ({ handleNextStage }) => {
  const isFormFetchingSuccess = useSelector((state) => state.form.isFormFetchingSuccess);
  const stage = useSelector((state) => state.form.currentStage);
  const isEditMode = useSelector((state) => state.form.isEditMode);
  

  const isHide = stage != 1;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm();

  const [formOptions, setFormOptions] = useState([]);

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject("product");
      if (!options) navigate('/404')

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

  const onSubmit = () => {
    handleNextStage();
    dispatch(updateFormData(getValues()));
  };

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
              title="Название заказа"
              propName="order_name"
              type="text"
              placeholder="Введите название заказа"
              required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Статус"
              propName="status"
              extraClassName="-status"
              required
            />
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
          </div>
        </div>
        {isEditMode ? '' : <ImagesUpload control={control} />}
      </div>
      {Object.keys(errors).length > 0 && (
        <p className={styles.form__errorMess}>
          Не все обязательные поля заполнены!
        </p>
      )}
      <NavigateButtons errors={errors} />
    </form>
  );
};
export default Product;
