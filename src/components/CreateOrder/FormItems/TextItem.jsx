import { Controller } from "react-hook-form";
import styles from "../CreateOrder.module.scss";
import { useEffect, useMemo, useRef } from "react";
import { getFormField } from "@store/orders/form.slice";
import { requiredFields } from "../../../store/orders/utils";

const TextItem = ({
  control,
  title,
  propName,
  placeholder,
  pattern,
  type,
  step,
  isTextArea,
}) => {
  const isRequired = requiredFields.includes(propName);

  return (
    <div className={styles.form__item}>
      <h3 className={styles.form__itemLabel}>
        <span>{title}</span>
        {isRequired ? (
          <span className={styles.form__itemLabel_star}>*</span>
        ) : (
          ""
        )}
      </h3>
      <Controller
        name={propName}
        control={control}
        rules={{
          required: isRequired
            ? {
                value: true,
                message: "Это поле обязательно",
              }
            : {},
          pattern: pattern ?? {},
        }}
        render={({ field }) => {
          let initialValue = getFormField(propName);
          if (initialValue && type == 'date') initialValue = initialValue.split('T')[0]
          if (field.value === undefined && initialValue) 
            field.onChange(initialValue)


          return (
            <div className={styles.form__textField}>
              {isTextArea ? (
                <textarea {...field} value={field.value} cols="20" rows="10"></textarea>
              ) : (
                <input
                  type={type}
                  step={step ?? null}
                  {...field}
                  placeholder={placeholder ?? ""}
                  value={field.value}
                />
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
export default TextItem;
