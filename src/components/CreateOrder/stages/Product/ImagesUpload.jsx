import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import axios from "axios";
import {
  updateFormData,
  getMediateField,
  updateMediateData,
  getFormField,
} from "../../../../store/orders/form.slice";

import styles from "../../CreateOrder.module.scss";
import { useDispatch } from "react-redux";
import { Controller } from "react-hook-form";

const ImagesUpload = ({ control, photoUrlsRef }) => {
  const dispatch = useDispatch();
  const [visibleControlImage, setVisibleControlImage] = useState(false);
  const [preview, setPreview] = useState([]);

  const initialSrcs = getFormField("photo_urls");
  let fileobjRef = useRef([]);
  photoUrlsRef.current = preview;

  // useEffect(() => {
  //   dispatch(updateFormData({ photo_urls: photoUrlsRef.current.length ? photoUrlsRef.current : null }))
  // }, [photoUrlsRef.current.join('')])

  const fetchFileobj = async () => {
    try {
      const fileobj = fileobjRef.current;
      const formData = new FormData();
      fileobj.forEach((file) => formData.append("files", file));
      if (!fileobj.length) {
        dispatch(updateFormData({ photo_urls: null }));
      } else {
        const res = await axios.post(apiEndpoints.photos, formData, {
          withCredentials: true,
        });
        console.log(res);
        dispatch(updateFormData({ photo_urls: res.data.photos }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadImages = () => {
    const fileobj = fileobjRef.current;
    let reader;
    setPreview([]);
    for (let i = 0; i < fileobj.length; i++) {
      reader = new FileReader();
      reader.readAsDataURL(fileobj[i]);
      reader.onload = (e) => {
        setPreview((prev) => [...prev, e.target.result]);
      };
    }
  };

  const changedHandler = (e) => {
    let files = e.target.files;
    // fileobjRef.current = [];
    Array.from(files).forEach((file) => fileobjRef.current.push(file));
    loadImages();
    fetchFileobj();
  };

  const deleteImage = (e) => {
    const index = e.target.id;
    fileobjRef.current = fileobjRef.current?.filter((_, ind) => ind != index);
    loadImages();
    fetchFileobj();
  };

  useEffect(() => {
    const fetchUrls = async () => {
      // console.log(initialSrcs);
      const files = [];
      for (const src of initialSrcs) {
        const res = await fetch(src);
        const blob = await res.blob();
        const file = new File([blob], "image", blob);
        files.push(file);
      }
      // console.log(files);
      fileobjRef.current = files;
      loadImages();
    };

    if (initialSrcs && fileobjRef.current.length == 0) fetchUrls();
  }, [initialSrcs]);

  // useEffect(() => {
  //   const test = async () => {
  //     const res = await fetch("https://drive.google.com/uc?id=1z3SH4ZtTZElhBA54_0T4D9QfFFp8Ctc2", { mode: 'no-cors' })
  //     console.log(res);
  //   }
  //   test()
  // }, [])

  return (
    <div className={styles.form__row}>
      <div className={styles.form__title}>
        Фото изделия <span className={styles.form__itemLabel_star}>*</span>
      </div>
      <div className={styles.form__imagesForm}>
        <div className={styles.form__imagesBlockPreview}>
          {(preview || []).map((url, index) => (
            <div
              className={styles.form__imageItem}
              key={index}
              onMouseEnter={() => setVisibleControlImage(true)}
              onMouseLeave={() => setVisibleControlImage(false)}
            >
              <img src={url} alt="img" className={styles.form__imagePreview} />
              <div
                id={index}
                onClick={deleteImage}
                className={
                  visibleControlImage
                    ? [
                        styles.form__deleteImage,
                        styles.form__deleteImageActive,
                      ].join(" ")
                    : styles.form__deleteImage
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
            <div className={styles.form__inputImages}>
              <Controller
                name={"images"}
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field }) => {
                  return (
                    <input
                      {...field}
                      type="file"
                      name="file"
                      multiple
                      onChange={changedHandler}
                    />
                  );
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="33"
                viewBox="0 0 36 33"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.792 5.82553C27.864 5.95139 27.99 6.04129 28.152 6.04129C32.472 6.04129 36 9.56537 36 13.8806V24.5607C36 28.8759 32.472 32.4 28.152 32.4H7.848C3.51 32.4 0 28.8759 0 24.5607V13.8806C0 9.56537 3.51 6.04129 7.848 6.04129C7.992 6.04129 8.136 5.96937 8.19 5.82553L8.298 5.60977C8.36005 5.47916 8.42374 5.34502 8.48839 5.20884C8.94887 4.2389 9.45832 3.16584 9.774 2.53518C10.602 0.916981 12.006 0.01798 13.752 0H22.23C23.976 0.01798 25.398 0.916981 26.226 2.53518C26.5095 3.10156 26.9414 4.01387 27.3577 4.89318C27.4436 5.07463 27.5289 5.25466 27.612 5.42997L27.792 5.82553ZM26.478 12.7297C26.478 13.6287 27.198 14.3479 28.098 14.3479C28.998 14.3479 29.736 13.6287 29.736 12.7297C29.736 11.8307 28.998 11.0935 28.098 11.0935C27.198 11.0935 26.478 11.8307 26.478 12.7297ZM14.886 15.5166C15.732 14.6716 16.83 14.2221 18 14.2221C19.17 14.2221 20.268 14.6716 21.096 15.4986C21.924 16.3257 22.374 17.4225 22.374 18.5912C22.356 21.0005 20.412 22.9604 18 22.9604C16.83 22.9604 15.732 22.5108 14.904 21.6838C14.076 20.8567 13.626 19.7599 13.626 18.5912V18.5732C13.608 17.4405 14.058 16.3437 14.886 15.5166ZM22.986 23.5896C21.708 24.8662 19.944 25.6573 18 25.6573C16.11 25.6573 14.346 24.9202 12.996 23.5896C11.664 22.2411 10.926 20.4791 10.926 18.5912C10.908 16.7213 11.646 14.9592 12.978 13.6107C14.328 12.2622 16.11 11.525 18 11.525C19.89 11.525 21.672 12.2622 23.004 13.5928C24.336 14.9413 25.074 16.7213 25.074 18.5912C25.056 20.551 24.264 22.3131 22.986 23.5896Z"
                  fill="#242424"
                />
              </svg>
              <span>
                нажмите для <br /> загрузки
              </span>
            </div>
            <div className={styles.form__prompt}>
              <h4 className={styles.form__promptTitle}>
                Добавьте <br /> фото или файлы
              </h4>
              <div className={styles.form__size}>до 250 МБ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImagesUpload;
