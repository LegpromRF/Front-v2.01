import { useCallback, useEffect, useState } from "react";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";

import styles from "../../CreateOrder.module.scss";
import NavigateButtons from "../../NavigateButtons";
import TextItem from "../../FormItems/TextItem";
import SelectItem from "../../FormItems/SelectItem";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@store/orderForm/form.slice";

const Conditions = ({ handleNextStage, handlePrevStage }) => {
  const stage = useSelector((state) => state.form.currentStage);
  const isHide = stage != 4

  const dispatch = useDispatch()
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject("conditions");
      
      const labels = {
        OTC_access: "Доступ на производство для ОТК заказчика",
        personnel_requirement: "Требования к персоналу",
        equipment_requirements: "Требования к оборудованию",
        packaging_requirements: "Требования к упаковке",
        labeling_requirements: "Требования к маркировке",
        payment_conditions: "Условия оплаты",
        acceptance_conditions: "Условия приемки",
        delivery_conditions: "Условия доставки",
        special_account: "Наличие спец. счета",
      };

      const updatedOptions = Object.entries(labels).map(([propName, label]) => {
        return {
          propName,
          label,
          options: options[propName],
        };
      });
      
      setFormOptions(updatedOptions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [getPropObject]);

  useEffect(() => {
    loadOptions();
  }, []);

  const onSubmit = () => {
    handleNextStage();
    dispatch(updateFormData(getValues()));
  };

  return (
    <form
      className={`${styles.form} ${isHide ? styles.form_hide : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.form__content}>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Доступ на производство для ОТК заказчика"
              propName="OTC_access"
              isMulti
              // required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Условия приемки"
              propName="acceptance_conditions"
              isMulti
              // required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Требования к оборудованию"
              propName="equipment_requirements"
              isMulti
              // required
            />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Требования к упаковке"
              propName="packaging_requirements"
              isMulti
              // required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Условия оплаты"
              propName="payment_conditions"
              isMulti
              // required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Требования к персоналу"
              propName="personnel_requirement"
              isMulti
              // required
            />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Требования к маркировке"
              propName="labeling_requirements"
              isMulti
              // required
            />

            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Условия доставки"
              propName="delivery_conditions"
              isMulti
              // required
            />
            <TextItem
              control={control}
              title="Количество швей, шт."
              propName="personnel_count"
              type="number"
              placeholder="Введите количество швей"
              // required
            />
          </div>
        </div>
        <div className={styles.form__row}>
          <div className={styles.form__items}>
            <TextItem
              control={control}
              title="Комментарии к заказу"
              propName="comment"
              type="text"
              placeholder="Введите комментарий к заказу"
              isTextArea
              // required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Наличие спец. счета"
              propName="special_account"
              extraClassName='-start-content'
              // required
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
        stage={4}
      />
    </form>
  );
};
export default Conditions;

//поля done
