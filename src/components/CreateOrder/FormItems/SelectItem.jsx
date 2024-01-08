import Select from "react-select";
import { Controller } from "react-hook-form";

import styles from "../CreateOrder.module.scss";
import Skeleton from "react-loading-skeleton";
import { getFormField } from "../../../store/orders/form.slice";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

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
          let initialValue = getFormField(propName);

          if (typeof initialValue == 'number') initialValue = selectOptions.find(opt => opt.value == initialValue)

          if (Array.isArray(initialValue) && typeof initialValue[0] == 'number') initialValue = initialValue.map(value => selectOptions.find(opt => opt.value == value))
          
          if ((field.value === undefined || field.value?.length == 0) && initialValue)
            field.onChange(initialValue);

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
