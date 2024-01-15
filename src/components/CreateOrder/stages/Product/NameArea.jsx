import { Controller } from "react-hook-form";

import styles from "../../CreateOrder.module.scss";
import { getFormField, updateFormData } from "../../../../store/orders/form.slice";
import { useDispatch, useSelector } from "react-redux";
import { requiredFields } from "../../../../store/orders/utils";
import { useEffect, useMemo, useRef } from "react";

const NameArea = ({ control }) => {
  const { isAdmin } = useSelector((state) => state.admindata);
  
  const isRequired = requiredFields.includes('order_name')

  
  // useEffect(() => {
  //   inputRef.current.value = ''
  // }, [])

  return (
    <div className={styles.form__item}>
      <h3 className={styles.form__itemLabel}>
        <span>Название заказа</span>
        {isRequired ? <span className={styles.form__itemLabel_star}>*</span> : ''}
      </h3>
      <Controller
        name={"order_name"}
        control={control}
        rules={{
          required: isRequired ? {
            value: true,
            message: "Это поле обязательно",
          } : {},
        }}
        render={({ field }) => {
          let initialValue = getFormField("order_name");
          
          
          if (field.value === undefined && initialValue) 
            field.onChange(initialValue)

          if (initialValue === undefined && field.value) 
            field.onChange(undefined)

          return (
            <div className={styles.form__textField}>
              <input
                {...field}
                type={"text"}
                placeholder={"Введите название заказа"}
              />
            </div>
          );
        }}
      />
       
        <div className={styles.form__itemCheckboxes}>
          <Controller
            name={"is_verified"}
            control={control}
            render={({ field }) => {
              const initialValue = getFormField("is_verified");

              if (field.value === undefined && (initialValue === true || initialValue === false)) 
                field.onChange(Boolean(initialValue))

              if (!isAdmin) return ''

              return (
                <div className={styles.form__checkField}>
                  <label htmlFor="is_verified">Проверено админом</label>
                  <input
                    {...field}
                    tabIndex={0}
                    id="is_verified"
                    name="is_verified"
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
export default NameArea;
