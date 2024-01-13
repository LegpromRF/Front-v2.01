import { Controller } from "react-hook-form";
import { getFormField } from "@store/orders/form.slice";
import { requiredFields } from "@store/orders/utils";
import styles from "../CreateOrder.module.scss";
import { useEffect } from "react";

const RadioItem = ({ control, title, propName, options }) => {
  const isRequired = requiredFields.includes(propName)

  return (
    <div className={styles.form__item}>
      <h3 className={styles.form__itemLabel}>
        <span>{title}</span>
        {isRequired ? <span className={styles.form__itemLabel_star}>*</span> : ""}
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
        }}
        render={({ field }) => {
          const initialValue = getFormField(propName);

          if (field.value === undefined && (initialValue === true || initialValue === false))
            field.onChange(initialValue)

          return (
            <div className={styles.form__radioWrapper}>
              {options.map(({ value, label }, ind) => (
                <div key={ind} className={styles.form__radio}>
                  <label htmlFor={label}>{label}</label>
                  <input
                    type="radio"
                    {...field}
                    id={label}
                    value={value}
                    onChange={() => field.onChange(value)}
                    tabIndex="0"
                    checked={Boolean(field.value) == Boolean(value)}
                  />
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};
export default RadioItem;
