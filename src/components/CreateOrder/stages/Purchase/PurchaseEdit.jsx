import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import NavigateButtons from "../../NavigateButtons";
import SelectItem from "../../FormItems/SelectItem";
import TextItem from "../../FormItems/TextItem";
import TotalSum from "./TotalSum";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@store/orders/form.slice";

import styles from "../../CreateOrder.module.scss";

const PurchaseEdit = ({ handlePrevStage, handleNextStage }) => {
  const stage = useSelector((state) => state.form.currentStage);
  const isHide = stage != 2;

  const dispatch = useDispatch();

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm();

  const [formOptions, setFormOptions] = useState([]);

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject("purchase");
      const labels = {
        //TODO purchase_type: "Вид закупки",
        price_nds: "Цена",
        location: "Регион",
        supplier_regions: "Возможные регионы производства",
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
  }, [getPropObject]);

  useEffect(() => {
    loadOptions();
  }, []);

  const firstFieldValue = watch("count") || 0;
  const secondFieldValue = watch("price_per_unit") || 0;
  const sum = (
    parseFloat(firstFieldValue) * parseFloat(secondFieldValue)
  ).toFixed(2);

  const onSubmit = useCallback(() => {
    setValue("price_for_all", sum);
    handleNextStage();
    dispatch(updateFormData(getValues()));
  }, [sum]);

  return (
    <form
      className={`${styles.form} ${isHide ? styles.form_hide : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`${styles.form__content} ${styles["form__content-blocks"]}`}
      >
        <div
          className={`${styles.form__block} ${styles["form__block-multiblock"]} ${styles["form__block-border-right"]}`}
        >
          <div className={styles.form__block}>
            <div className={styles.form__title}>Количество</div>
            <TextItem
              control={control}
              title="Возможно взять заказ частично (от шт.)."
              propName="minimum_quantity"
              type="number"
              placeholder="Введите количество"
              pattern={{
                value: /^\d+(\.\d{1,2})?$/,
                message: "Введите число",
              }}
            />
          </div>
          <div
            className={`${styles.form__block} ${styles["form__block-border-top"]}`}
          >
            <div className={styles.form__title}>Стоимость</div>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Цена"
              propName="price_nds"
            />
          </div>
        </div>
        <div
          className={`${styles.form__block} ${styles["form__block-border-right"]}`}
        >
          <div className={styles.form__title}>Сроки</div>
          <TextItem
            control={control}
            title="Взять в производство не позднее"
            propName="start_date"
            type={"date"}
          />
          <TextItem
            control={control}
            title="Срок исполнения заказа с момента получения аванса/сырья"
            propName="order_lead_time"
            placeholder="Например: 2 недели"
          />
        </div>
        <div className={styles.form__block}>
          <div className={styles.form__title}>
            Регионы поставки и производства
          </div>
          <SelectItem
            control={control}
            formOptions={formOptions ?? []}
            title="Возможные регионы производства"
            propName="supplier_regions"
          />
        </div>
      </div>
      <NavigateButtons
        errors={errors}
        handlePrevStage={handlePrevStage}
        stage={2}
      />
    </form>
  );
};
export default PurchaseEdit;
