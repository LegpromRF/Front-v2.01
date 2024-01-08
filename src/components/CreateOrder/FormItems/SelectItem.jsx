import Select from "react-select";
import { Controller } from "react-hook-form";

import styles from "../CreateOrder.module.scss";
import Skeleton from "react-loading-skeleton";
import { getFormField } from "../../../store/orders/form.slice";
import { useMemo, useRef, useState } from "react";
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
          const isEdited = useRef(false)
          
          let initialValue = getFormField(propName)
          initialValue = selectOptions.length ? initialValue : undefined;

          if (propName == 'supplier_regions' && initialValue && !isEdited.current) {
            console.log(initialValue, selectOptions);
            isEdited.current = true
            const result = []
            Object.entries(initialValue).forEach(([country, regions]) => {
              if (regions.length) {
                regions.forEach(region => {
                  const regionName = selectOptions.find(opt => opt.value.split('.').length == 2 && +opt.value.split('.')[1] == region).label.split('.')[1]
                  const countryName = selectOptions.find(opt => +opt.value.split('.')[0] == country).label.split('.')[0]
                  result.push({label: countryName+'.'+regionName, value: country+'.'+region})
                })
              }
              else {
                const countryName = selectOptions.find(opt => +opt.value == country)?.label
                  result[countryName] = country
                  result.push({label: countryName, value: country})
              }
            })
            initialValue = result
            console.log('new initialValue', initialValue);
          }

          if (typeof initialValue == 'number') initialValue = selectOptions.find(opt => opt.value == initialValue)

          if (Array.isArray(initialValue) && typeof initialValue[0] == 'number') {
            initialValue = initialValue.map(value => selectOptions.find(opt => opt.value == value))
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
