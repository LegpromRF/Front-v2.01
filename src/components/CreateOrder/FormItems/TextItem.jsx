import { Controller } from "react-hook-form";
import styles from "../CreateOrder.module.scss";
import { useRef } from "react";
import { getFormField } from "@store/orderForm/form.slice";

const TextItem = ({
  control,
  title,
  propName,
  placeholder,
  pattern,
  type,
  step,
  isTextArea,
  required,
}) => {

  return (
    <div className={styles.form__item}>
      <h3 className={styles.form__itemLabel}>
        <span>{title}</span>
        {required ? <span className={styles.form__itemLabel_star}>*</span> : ""}
      </h3>
      <Controller
        name={propName}
        control={control}
        rules={{
          required: required
            ? {
                value: true,
                message: "Это поле обязательно",
              }
            : {},
          pattern: pattern ?? {},
        }}
        render={({ field }) => {
          const initialValue = getFormField(propName);
          if (field.value === undefined && initialValue)
            field.onChange(initialValue);

          return (
            <div className={styles.form__textField}>
              {isTextArea ? <textarea cols="20" rows="10"></textarea>: <input
                type={type}
                step={step ?? null}
                {...field}
                placeholder={placeholder ?? ""}
              />}
            </div>
          );
        }}
      />
    </div>
  );
};
export default TextItem;
