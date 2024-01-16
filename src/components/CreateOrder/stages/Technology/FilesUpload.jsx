import { Controller } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { aiEndpoints, apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import { getFormField } from "@store/orders/form.slice";

import styles from "../../CreateOrder.module.scss";
import { useDispatch } from "react-redux";
import {
  updateFormData
} from "@store/orders/form.slice";
import { Link } from "react-router-dom";

const FilesUpload = ({ control }) => {
  const dispatch = useDispatch();
  const [visibleControlImage, setVisibleControlImage] = useState(false);
  const initialUrls = getFormField("doc_urls") || [];
  const [preview, setPreview] = useState(initialUrls);

  let inputRef = useRef(null);

  // const initialValue = getMediateField('doc_urls')

  const fetchDocs = async (formData) => {
    const res = await axios.post(apiEndpoints.documents, formData, {
      withCredentials: true,
    });
    console.log(res);

    setPreview((prev => {
      const newPreview = [...prev, ...res.data.docs]
      dispatch(updateFormData({ doc_urls: newPreview }));
      return newPreview
    }))
    // dispatch(updateMediateData({ doc_urls: formData }));
  };

  const handleFile = async () => {
    const fileList = inputRef.current?.files;
    if (!fileList) return;
    const files = Array.from(fileList);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      // field.onChange(formData);
      // loadPreview();
      await fetchDocs(formData);
    } catch (error) {
      console.log(error);
    }
  };

  // const loadPreview = () => {
  //   const fileList = inputRef.current?.files;
  //   if (!fileList) return;
  //   const filesToPreview = Array.from(fileList).map((file) => file.name);
  //   console.log("files to preview", filesToPreview, fileList);
  //   setPreview(filesToPreview);
  // };

  const deleteFile = async (e) => {
    // e.stopPropagation()
    const index = e.target.id;
    setPreview((prev) => {
      const newPreview = prev.filter((_, ind) => ind != index)
      if (newPreview.length == 0) dispatch(updateFormData({ doc_urls: null }));
      else dispatch(updateFormData({ doc_urls: newPreview }));
      return newPreview
    });
  };

  // const deleteFile = async (e) => {
  //   const index = e.target.id;
  //   const fileList = inputRef.current?.files;
  //   if (!fileList) return;
  //   const newFiles = Array.from(fileList).filter((_, ind) => ind != index);

  //   try {
  //     const formData = new FormData();
  //     newFiles.forEach((file) => formData.append("files", file));

  //     inputFieldRef.current.onChange(formData);
  //     let container = new DataTransfer();
  //     newFiles.forEach((file) => container.items.add(file));
  //     inputRef.current.files = container.files;

  //     loadPreview();
  //     await fetchDocs(formData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const urls = [
  //   "https://yadi.sk/i/mv-LKXLY3Gze7w",
  //   "https://yadi.sk/d/sOvi1qogBEYMyg",
  // ];

  useEffect(() => {
    if (initialUrls && !preview.length) setPreview(initialUrls);
    // axios.get('https://disk.yandex.ru/i/BFRTDubkXQpKkw', { withCredentials: true, AccessControlAllowOrigin: true }).then(res => {
    //   console.log(res);
    // })
    //   if (inputFieldRef.current && inputFieldRef.current.value === undefined && initialValue) {
    //     //возвращение значений у input, после редиректа
    //     if (!inputRef.current) return;
    //     inputFieldRef.current.onChange(initialValue);
    //     let container = new DataTransfer();
    //     const fileList = initialValue.getAll("files");
    //     if (fileList) {
    //       Array.from(fileList).forEach((file) =>
    //         container.items.add(file)
    //       );
    //       inputRef.current.files = container.files;
    //     }

    //     loadPreview()
    //   }
  }, [initialUrls.length, preview.length]);

  return (
    <div className={styles.form__row}>
      <div className={styles.form__title}>Техзадание (Описание)</div>
      <div className={styles.form__imagesForm}>
        <div className={styles.form__imagesBlockPreview}>
          {(preview || []).map((url, index) => (
            <div
              className={styles.form__imageItem}
              key={index}
              onMouseEnter={() => setVisibleControlImage(true)}
              onMouseLeave={() => setVisibleControlImage(false)}
            >
              <Link to={url} target="_blank">
                <div
                  className={[
                    `${styles.form__imagePreview} ${styles["form__imagePreview-files"]}`,
                  ]}
                >
                  <span className={styles["form__imagePreview-files_ext"]}>
                    {url.split("/").slice(-1)[0].slice(0, 7)}
                  </span>
                  {/* <span className={styles["form__imagePreview-files_name"]}>
                  {fileName}
                </span> */}
                </div>
              </Link>
              <div
                id={index}
                onClick={deleteFile}
                className={
                  [
                    styles.form__deleteImage,
                    styles.form__deleteImageActive,
                  ].join(" ")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.01007 5.00009L9.79072 1.21944C10.07 0.940162 10.07 0.488741 9.79072 0.209461C9.51144 -0.0698202 9.06002 -0.0698202 8.78074 0.209461L5.00009 3.99011L1.21944 0.209461C0.940162 -0.0698202 0.488741 -0.0698202 0.209461 0.209461C-0.0698202 0.488741 -0.0698202 0.940162 0.209461 1.21944L3.99011 5.00009L0.209461 8.78074C-0.0698202 9.06002 -0.0698202 9.51144 0.209461 9.79072C0.348744 9.93 0.531598 10 0.714452 10C0.897305 10 1.08016 9.93 1.21944 9.79072L5.00009 6.01007L8.78074 9.79072C8.92002 9.93 9.10287 10 9.28573 10C9.46858 10 9.65144 9.93 9.79072 9.79072C10.07 9.51144 10.07 9.06002 9.79072 8.78074L6.01007 5.00009Z"
                    fill="#FF0A00"
                  />
                </svg>
              </div>
            </div>
          ))}
          <div className={styles.form__addButton}>
            <div
              className={`${styles.form__inputImages} ${styles["form__inputImages-files"]}`}
            >
              <Controller
                name={"file-docs"}
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="file"
                      multiple={true}
                      accept=".docx,.doc"
                      aria-label="Текстовый документ"
                      onChange={handleFile}
                      ref={inputRef}
                    />
                  </div>
                )}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13H10ZM8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16H8ZM8.5 9C7.94772 9 7.5 9.44772 7.5 10C7.5 10.5523 7.94772 11 8.5 11V9ZM9.5 11C10.0523 11 10.5 10.5523 10.5 10C10.5 9.44772 10.0523 9 9.5 9V11ZM8.5 6C7.94772 6 7.5 6.44772 7.5 7C7.5 7.55228 7.94772 8 8.5 8V6ZM9.5 8C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6V8ZM17.908 20.782L17.454 19.891L17.454 19.891L17.908 20.782ZM18.782 19.908L19.673 20.362L18.782 19.908ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM8 13V16H10V13H8ZM8.5 11H9.5V9H8.5V11ZM8.5 8H9.5V6H8.5V8ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H15.8V20H8.2V22ZM20 17.8V9H18V17.8H20ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM15.8 22C16.3436 22 16.8114 22.0008 17.195 21.9694C17.5904 21.9371 17.9836 21.8658 18.362 21.673L17.454 19.891C17.4045 19.9162 17.3038 19.9539 17.0322 19.9761C16.7488 19.9992 16.3766 20 15.8 20V22ZM18 17.8C18 18.3766 17.9992 18.7488 17.9761 19.0322C17.9539 19.3038 17.9162 19.4045 17.891 19.454L19.673 20.362C19.8658 19.9836 19.9371 19.5904 19.9694 19.195C20.0008 18.8114 20 18.3436 20 17.8H18ZM18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362L17.891 19.454C17.7951 19.6422 17.6422 19.7951 17.454 19.891L18.362 21.673ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698Z"
                  fill="#000000"
                />
              </svg>
              <span>
                нажмите для <br /> загрузки
              </span>
            </div>
            <div className={styles.form__prompt}>
              <h4 className={styles.form__promptTitle}>
                Добавьте <br /> файлы
              </h4>
              <div className={styles.form__size}>до 250 МБ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilesUpload;

// const FilesUpload = ({ control, watch }) => {
//   const dispatch = useDispatch();

//   const fetchDocs = async (formData) => {
//     const res = await axios.post(apiEndpoints.documents, formData, {
//       withCredentials: true,
//     });

//     dispatch(updateFormData({ doc_urls: res.data.docs })); //!только для docs - переделать!
//   };

// const handleTextFile = async (e, field) => {
//   try {
//     const formData = new FormData();
//     for (let i = 0; i < e.target.files.length; i++) {
//       formData.append("files", e.target.files[i]);
//     }

//     field.onChange(formData);
//     await fetchDocs(formData);
//   } catch (error) {
//     console.log(error);
//   }
// };

//   const inputRef = useRef(null);

//   return (
//     <div className={`${styles.form__item} ${styles["form__item-file-input"]}`}>
//       <h3 className={styles.form__itemLabel}>Техзадание (Описание)</h3>
// <Controller
//   name={"file"}
//   control={control}
//   render={({ field }) => {
//     const initialValue = getMediateField("doc_urls");
//     useEffect(() => {
//       console.log(initialValue);
//       if (field.value === undefined && initialValue) {
//         //возвращение значений у input, после редиректа
//         if (!inputRef.current) return;
//         field.onChange(initialValue);
//         let container = new DataTransfer();
//         const fileList = initialValue.getAll("files");
//         if (fileList) {
//           Array.from(fileList).forEach((file) =>
//             container.items.add(file)
//           );
//           inputRef.current.files = container.files;
//         }
//       }
//     }, []);

//     return (
//       <div>
//         <input
//           type="file"
//           multiple={true}
//           accept=".docx"
//           aria-label="Текстовый документ"
//           onChange={(e) => {
//             handleTextFile(e, field);
//           }}
//           ref={inputRef}
//         />
//         {watch("file") && field.value && (
//           <p>
//             Выбран файл:{" "}
//             {field.value.getAll("files").map((file, ind) => (
//               <span key={ind}>{file.name}</span>
//             ))}
//           </p>
//         )}
//       </div>
//     );
//   }}
// />
//     </div>
//   );
// };
// export default FilesUpload;
