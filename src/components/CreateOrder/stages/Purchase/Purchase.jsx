import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import NavigateButtons from "../../NavigateButtons";
import SelectItem from "../../FormItems/SelectItem";
import TextItem from "../../FormItems/TextItem";
import TotalSum from "./TotalSum";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@store/orders/form.slice";
import { useNavigate } from "react-router-dom";
import { setStageFields } from "@store/orders/form.slice";

import styles from "../../CreateOrder.module.scss";

const Purchase = ({ handlePrevStage, handleNextStage, formSubmitRef }) => {
  const {currentStage: stage, isFormFetchingSuccess, isEditMode, formData} = useSelector((state) => state.form);
  const isHide = stage != 2;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue
  } = useForm();

  const [formOptions, setFormOptions] = useState([]);

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject("purchase");

      if (!options) navigate('/404')
      
      const labels = {
        purchase_type: "Вид закупки",
        price_nds: "Цена",
        location: "Регион",
        supplier_regions: "Возможные регионы производства",
      };
      
      const transformedSupplierRegions = {};

      Object.entries(options.supplier_regions).forEach(
        ([firstKey, countryObj]) => {
          const country = Object.entries(countryObj)[0][0];
          const countryData = Object.entries(countryObj)[0][1];

          if (Object.entries(countryData).length) {
            Object.entries(countryData).forEach(([secondKey, region]) => {
              transformedSupplierRegions[country + "." + region] =
                firstKey + "." + secondKey;
            });
          } else {
            transformedSupplierRegions[country] = String(firstKey);
          }
        }
      );
      options.supplier_regions = transformedSupplierRegions;
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

  useEffect(() => {
    if (!isEditMode) dispatch(updateFormData(getValues()));
  }, [isEditMode])
  
  useEffect(() => {
    dispatch(setStageFields({ name: 'purchase', fields: Object.keys(getValues())}))
    
    watch((formValues, changes) => {
      if (changes.name) {
        dispatch(updateFormData(({ [changes.name]: changes.values[changes.name] })));
      }
    })
  }, [])

  const firstFieldValue = watch("count") || 0;
  const secondFieldValue = watch("price_per_unit") || 0;
  const sum = (
    Math.abs(parseFloat(firstFieldValue)) * Math.abs(parseFloat(secondFieldValue))
  ).toFixed(2);

  const onSubmit = useCallback(() => {
    handleNextStage();
    dispatch(updateFormData(getValues()));
  }, [sum]);

  const formSubmit = handleSubmit(onSubmit)
  formSubmitRef.current = formSubmit

  useEffect(() => {
    // reset()
  }, [isFormFetchingSuccess])

  useEffect(() => {
    setValue("price_for_all", sum);
  }, [sum])

  useEffect(() => {
    if (Object.keys(formData).length == 0) {
      Object.keys(getValues()).forEach((key) => {
        setValue(key, undefined)
      })
    }
  }, [Object.keys(formData).length])

  return (
    <form
      className={`${styles.form} ${isHide ? styles.form_hide : ""}`}
      onSubmit={formSubmit}
    >
      <div
        className={`${styles.form__content} ${styles["form__content-blocks"]}`}
      >
        <div
          className={`${styles.form__block} ${styles["form__block-multiblock"]} ${styles["form__block-border-right"]}`}
        >
          <div className={styles.form__block}>
            <div className={styles.form__title}>Количество и вид закупки</div>
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
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Вид закупки"
              propName="purchase_type"
              isMulti
            />
          </div>
          <div
            className={`${styles.form__block} ${styles["form__block-border-top"]}`}
          >
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
            required
          />
          <SelectItem
            control={control}
            formOptions={formOptions ?? []}
            title="Возможные регионы производства"
            propName="supplier_regions"
            isMulti
          />
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
        stage={2}
      />
    </form>
  );
};
export default Purchase;
