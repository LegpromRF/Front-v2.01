import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "../../CreateOrder.module.scss";
import NavigateButtons from "../../NavigateButtons";
import TextItem from "../../FormItems/TextItem";
import SelectItem from "../../FormItems/SelectItem";
import RadioItem from "../../FormItems/RadioItem";
import FileItem from "../../FormItems/FileItem";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@store/orderForm/form.slice";

const Technology = ({ handlePrevStage, handleNextStage }) => {
  const stage = useSelector((state) => state.form.currentStage);
  const isHide = stage != 3;

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  const [formOptions, setFormOptions] = useState([]);

  const loadOptions = useCallback(async () => {
    try {
      const options = await getPropObject("technology");
      const labels = {
        additional_services: "Дополнительные услуги",
        material_type: "Вид ткани",
        payment_for_a_sample: "Оплата пошива образца",
        sewing_a_sample: "Пошив образца",
        raw_materials: "Сырье",
        technological_doc: "Технологическая документация",
        type_of_application: "Нанесение лого",
        pattern_doc: "Конструкторская документация",
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

  const onSubmit = () => {
    handleNextStage();
    dispatch(updateFormData(getValues()));
  };

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
            <div className={styles.form__title}>Документация</div>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Конструкторская документация"
              propName="pattern_doc"
              isMulti
              // required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Технологическая документация"
              propName="technological_doc"
              isMulti
              // required
            />
            <TextItem
              control={control}
              title="Размеры: сколько разных размеров/ростовок"
              propName="sizes"
              type="text"
              placeholder="Введите размер"
              isTextArea
              // required
            />
          </div>
          <div
            className={`${styles.form__block} ${styles["form__block-border-top"]}`}
          >
            <div className={styles.form__title}>Дополнительные услуги</div>
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Дополнительные услуги"
              propName="additional_services"
              // required
            />
            <SelectItem
              control={control}
              formOptions={formOptions ?? []}
              title="Нанесение лого"
              propName="type_of_application"
              // required
            />
          </div>
        </div>
        <div
          className={`${styles.form__block} ${styles["form__block-border-right"]}`}
        >
          <div className={styles.form__title}>Образец</div>
          <RadioItem
            control={control}
            title="Заказчик предоставляет образец"
            propName="providing_a_sample"
            options={[
              { label: "Да", value: true },
              { label: "Нет", value: false },
            ]}
            // required
          />
          <SelectItem
            control={control}
            formOptions={formOptions ?? []}
            title="Пошив образца"
            propName="sewing_a_sample"
            // required
          />
          <SelectItem
            control={control}
            formOptions={formOptions ?? []}
            title="Оплата пошива образца"
            propName="payment_for_a_sample"
            // required
          />
          <FileItem
            control={control}
            propName="doc_urls"
            inputAccept=".docx"
            inputAreaLabel="Текстовый документ"
          />
        </div>
        <div className={styles.form__block}>
          <div className={styles.form__title}>Сырье</div>
          <SelectItem
            control={control}
            formOptions={formOptions ?? []}
            title="Вид ткани"
            propName="material_type"
            // required
          />
          <SelectItem
            control={control}
            formOptions={formOptions ?? []}
            title="Сырье"
            propName="raw_materials"
            isMulti
            // required
          />
          <TextItem
            control={control}
            title="Плотность ткани"
            propName="fabric_density"
            type="text"
            placeholder="Введите плотность ткани"
            // required
          />
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <div>Не все обязательные поля заполнены!</div>
      )}
      <NavigateButtons
        errors={errors}
        handlePrevStage={handlePrevStage}
        stage={3}
      />
    </form>
  );
};
export default Technology;

// поля done