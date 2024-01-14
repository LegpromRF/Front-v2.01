import { Controller } from "react-hook-form";
import styles from "../../CreateOrder.module.scss";
import { getFormField } from "../../../../store/orders/form.slice";
import { useEffect } from "react";

const PhoneArea = ({ control }) => {
  
  return (
    <div className={styles.form__item}>
      <h3 className={styles.form__itemLabel}>
        <span>Введите телефон</span>
      </h3>
      <Controller
        name={"customer_phone"}
        control={control}
        render={({ field }) => {
          const initialValue = getFormField("customer_phone");
          
          if (field.value === undefined && initialValue)
            field.onChange(initialValue);

          return (
            <div className={styles.form__textField}>
              <input
                {...field}
                type={"tel"}
                placeholder={"Введите номер телефона"}
              />
            </div>
          );
        }}
      />
      <div className={styles.form__itemCheckboxes}>
        <Controller
          name={"customer_whatsapp"}
          control={control}
          render={({ field }) => {
            const initialValue = getFormField("customer_whatsapp");
            
            if (field.value === undefined && initialValue != undefined) {
              field.onChange(Boolean(initialValue));
            }

            return (
              <div className={styles.form__checkField}>
                <label htmlFor="customer_whatsapp">Whatsapp</label>
                <input
                  {...field}
                  tabIndex={0}
                  id="customer_whatsapp"
                  name="customer_whatsapp"
                  type={"checkbox"}
                  checked={field.value}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
export default PhoneArea;
