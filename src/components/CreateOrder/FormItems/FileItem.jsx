import { Controller } from "react-hook-form";
import { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { aiEndpoints, apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import { getFormField } from "@store/orderForm/form.slice";

import styles from "../CreateOrder.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, updateMediateData, getMediateData } from "@store/orderForm/form.slice";

const FileItem = ({ control, inputAccept, inputAreaLabel, propName }) => {
  const dispatch = useDispatch()

  const fetchDocs = async (formData) => {
    const res = await axios.post(apiEndpoints.documents, formData, {
      withCredentials: true,
    });

    dispatch(updateFormData({ [propName]: res.data.docs})); //!только для docs - переделать!
    dispatch(updateMediateData({ [propName]: formData })); 
  }

  const handleTextFile = async (e, field) => {
    try {
      const formData = new FormData();

      // const fileLoaded = new Promise((resolve) => {
      //   for (let i = 0; i < e.target.files.length; i++) {
      //     formData.append("files", e.target.files[i]);
      //   }
      //   resolve();
      // });
      // await fileLoaded;

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("files", e.target.files[i]);
      }
      field.onChange(formData);
      await fetchDocs(formData)
      

      // const res = await axios
      //   .post(apiEndpoints.documents, formData, {
      //     withCredentials: true,
      //   })
      //   .then((response) => {
      //     console.log(response);
      //     setValue(doc_urls or docs, response.data.docs);
      //   });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const inputRef = useRef(null);

  return (
    <div className={`${styles.form__item} ${styles["form__item-file-input"]}`}>
      <h3 className={styles.form__itemLabel}>Техзадание (Описание)</h3>
      <Controller
        name={'file'}
        control={control}
        render={({ field }) => {
          const initialValue = getMediateData('doc_urls');
          useEffect(() => {
            console.log(initialValue);
            if (field.value === undefined && initialValue) {
              //возвращение значений у input, после редиректа
              if (!inputRef.current) return;
              field.onChange(initialValue);
              let container = new DataTransfer();
              const fileList = initialValue.getAll("files");
              if (fileList) {
                Array.from(fileList).forEach((file) =>
                  container.items.add(file)
                );
                inputRef.current.files = container.files;
              }
            }
          }, []);

          return (
            <div>
              <input
                type="file"
                multiple={true}
                accept={inputAccept}
                aria-label={inputAreaLabel}
                onChange={(e) => {
                  handleTextFile(e, field);
                }}
                ref={inputRef}
              />
              {/* {watch({ propName }) && field.value && (
                <p>Выбран файл: {field.value.name}</p>
              )} */}
            </div>
          );
        }}
      />
    </div>
  );
};
export default FileItem;
