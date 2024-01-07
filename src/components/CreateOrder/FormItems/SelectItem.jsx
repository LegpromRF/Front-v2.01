import Select from "react-select";
import { Controller } from "react-hook-form";

import styles from "../CreateOrder.module.scss";
import Skeleton from "react-loading-skeleton";
import { getFormField } from "../../../store/orderForm/form.slice";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const SelectItem = ({
  control,
  formOptions,
  title,
  propName,
  isMulti,
  extraClassName,
  required
}) => {
  const selectOptions = Object.entries(
    formOptions.find((opt) => opt.propName == propName)?.options ?? []
  ).map(([label, value]) => ({ label, value }));

  const initialValue = getFormField(propName);

  return (
    <div className={`${styles.form__item} ${extraClassName ? styles['form__item' + extraClassName] : ''}`}>
      <h3 className={styles.form__itemLabel}>
        <span>{title}</span>
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
          if (field.value === undefined && initialValue)
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
