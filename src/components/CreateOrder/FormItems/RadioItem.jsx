import { Controller } from "react-hook-form";
import styles from "../CreateOrder.module.scss";
import { getFormField } from "@store/orderForm/form.slice";

const RadioItem = ({
  control,
  title,
  propName,
  options,
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
        }}
        render={({ field }) => {
          const initialValue = getFormField(propName);
          if (field.value === undefined && initialValue)
            field.onChange(initialValue);
          
          return (
          <div className={styles.form__radioWrapper}>
            {options.map(({ value, label }, ind) => (
              <div key={ind} className={styles.form__radio}>
                <label>{label}</label>
                <input type="radio" {...field} value={value} />
              </div>
            ))}
          </div>
        )}}
      />
    </div>
  );
};
export default RadioItem;
