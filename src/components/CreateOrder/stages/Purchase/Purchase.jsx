import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import Skeleton from "react-loading-skeleton";

import styles from "../../CreateOrder.module.scss";
import NavigateButtons from "../../NavigateButtons";
import SelectItem from "../../FormItems/SelectItem";
import TextItem from "../../FormItems/TextItem";
import TotalSum from "./TotalSum";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@store/orderForm/form.slice";
import { getFormField } from "../../../../store/orderForm/form.slice";

const Purchase = ({ handlePrevStage, handleNextStage }) => {
  const stage = useSelector((state) => state.form.currentStage);
  const isHide = stage != 2;

  const dispatch = useDispatch();

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue
  } = useForm();

  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject("purchase");
      const labels = {
        // price_nds: "с/без НДС",
        price_nds: "Цена",
        location: "Регион",
        supplier_regions: "Возможные регионы производства",
      };
      console.log(options);
      const updatedOptions = Object.entries(labels).map(([propName, label]) => {
        return {
          propName,
          label,
          options: options[propName],
        };
      });

      setLoading(false);
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
    setValue("price_for_all", sum)
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
        <div className={`${styles.form__block} ${styles['form__block-multiblock']} ${styles['form__block-border-right']}`}>
          <div className={styles.form__block}>
            <div className={styles.form__title}>Количество</div>
            <TextItem
              control={control}
              title="Количество"
              propName="count"
              type="number"
              placeholder={"Введите целое число"}
              pattern={{
                value: /^[0-9]*$/,
                message: "Введите целое число",
              }}
              required
            />
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
          <div className={`${styles.form__block} ${styles['form__block-border-top']}`}>
            <div className={styles.form__title}>Стоимость</div>
            <TextItem
              control={control}
              title="Цена за шт."
              propName="price_per_unit"
              type="number"
              step={0.01}
              placeholder={"Введите цену"}
              pattern={{
                value: /^\d+(\.\d{1,2})?$/,
                message: "Введите число с двумя знаками после запятой",
              }}
              required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Цена"
              propName="price_nds"
              loading={loading}
              
            />
          </div>
        </div>
        <div className={`${styles.form__block} ${styles['form__block-border-right']}`}>
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
          <TextItem
            control={control}
            title="Срок поставки не позднее"
            propName="deadline"
            type={"date"}
            required
          />
          <TotalSum sum={sum} />
        </div>
        <div className={styles.form__block}>
          <div className={styles.form__title}>
            Регионы поставки и производства
          </div>
          <SelectItem
            control={control}
            formOptions={formOptions ?? []}
            title="Регион"
            propName="location"
            loading={loading}
            required
          />
          <SelectItem
            control={control}
            formOptions={formOptions ?? []}
            title="Возможные регионы производства"
            propName="supplier_regions"
            loading={loading}
            
          />
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <div>Не все обязательные поля заполнены!</div>
      )}
      <NavigateButtons
        errors={errors}
        handlePrevStage={handlePrevStage}
        stage={2}
      />
    </form>
  );
};
export default Purchase;

//Поля done
