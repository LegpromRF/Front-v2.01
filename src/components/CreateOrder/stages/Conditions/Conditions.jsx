import { useCallback, useEffect, useState } from "react";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import { useForm } from "react-hook-form";
import NavigateButtons from "../../NavigateButtons";
import TextItem from "../../FormItems/TextItem";
import SelectItem from "../../FormItems/SelectItem";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@store/orders/form.slice";

import styles from "../../CreateOrder.module.scss";
import { useNavigate } from "react-router-dom";
import { setStageFields } from "../../../../store/orders/form.slice";

const Conditions = ({ handleNextStage, handlePrevStage, formSubmitRef }) => {
  const {currentStage: stage, isFormFetchingSuccess, isEditMode} = useSelector((state) => state.form);
  const isHide = stage != 4;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch
  } = useForm();


  const [formOptions, setFormOptions] = useState([]);

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject("conditions");
      // if (!options) navigate('/404')

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
    dispatch(setStageFields({ name: 'conditions', fields: Object.keys(getValues())}))
    
    watch((formValues, changes) => {
      // console.log(changes);
      if (changes.name) {
        dispatch(updateFormData(({ [changes.name]: changes.values[changes.name] })));
      }
    })
  }, [])

  const onSubmit = () => {
    handleNextStage();
    dispatch(updateFormData(getValues()));
  };

  const formSubmit = handleSubmit(onSubmit)
  formSubmitRef.current = formSubmit

  useEffect(() => {
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
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Доступ на производство для ОТК заказчика"
              propName="OTC_access"
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Условия приемки"
              propName="acceptance_conditions"
              isMulti
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Требования к оборудованию"
              propName="equipment_requirements"
              isMulti
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
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Условия оплаты"
              propName="payment_conditions"
              isMulti
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Требования к персоналу"
              propName="personnel_requirement"
              isMulti
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
            />

            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Условия доставки"
              propName="delivery_conditions"
              isMulti
            />
            <TextItem
              control={control}
              title="Количество швей, шт."
              propName="personnel_count"
              type="number"
              placeholder="Введите количество швей"
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
            />
            <TextItem
              control={control}
              title="Дополнительные требования"
              propName="additional_requirements"
              type="text"
              placeholder="Введите ваши требования"
              isTextArea
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Наличие спец. счета"
              propName="special_account"
              extraClassName="-start-content"
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
