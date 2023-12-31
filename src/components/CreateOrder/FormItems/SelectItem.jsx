import Select from "react-select";
import { Controller } from "react-hook-form";

import styles from "../CreateOrder.module.scss";
import Skeleton from "react-loading-skeleton";
import { getFormField } from "../../../store/orders/form.slice";
import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { transformFieldToInput } from "./utils";

const SelectItem = ({
  control,
  formOptions,
  title,
  propName,
  isMulti,
  extraClassName,
  required,
}) => {
  const selectOptions = Object.entries(
    formOptions.find((opt) => opt.propName == propName)?.options ?? []
  ).map(([label, value]) => ({ label, value }));

  

  return (
    <div
      className={`${styles.form__item} ${
        extraClassName ? styles["form__item" + extraClassName] : ""
      }`}
    >
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
          const isFieldTransformed = useRef(false) //для случаев когда заявка редактируется и поля приходят в серверном виде
          
          let initialValue = getFormField(propName)
          initialValue = selectOptions.length ? initialValue : undefined;

          if (initialValue && !isFieldTransformed.current) {
            initialValue = transformFieldToInput(propName, initialValue, selectOptions)
            isFieldTransformed.current = true
          }

          if (field.value === undefined && initialValue) {
            field.onChange(initialValue);
          }
            

          return (
            <Select
              {...field}
              isClearable={true}
              required={required}
              isMulti={isMulti}
              closeMenuOnSelect={!isMulti}
              value={field.value}
              // onChange={handleChange}
              options={selectOptions}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "auto",
                }),
              }}
              placeholder="нажмите для выбора"
              onChange={(selectedOption) => field.onChange(selectedOption)}
            />
          );
        }}
      />
    </div>
  );
};
export default SelectItem;
