import { stagesCount } from "@store/orders/form.slice";

import styles from "./CreateOrder.module.scss";
import { useSelector } from "react-redux";
import { getFormField } from "../../store/orders/form.slice";

const NavigateButtons = ({ errors, handlePrevStage }) => {
  const isPhotoUrlsExist = Boolean(getFormField("photo_urls")?.length);
  const isEditMode = useSelector((state) => state.form.isEditMode);
  const stage = useSelector((state) => state.form.currentStage);

  return (
    <>
      <div className={styles.form__button}>
        {stage != 1 ? (
          <button
            type="button"
            onClick={handlePrevStage}
            className={styles.form__buttonBack}
          >
            Назад
          </button>
        ) : (
          ""
        )}
        <button
          type="submit"
          className={
            errors
              ? styles.form__buttonForward
              : styles.form__buttonForward_disabled
          }
        >
          {stage == stagesCount - 1
            ? isEditMode
              ? "Сохранить"
              : "Отправить"
            : "Вперед"}
        </button>
      </div>
      {!isPhotoUrlsExist && stage == 5 ? (
        <p className={styles.form__errorMess}>
          Заполните поле "Фото изделия" на первой стадии
        </p>
      ) : (
        ""
      )}
    </>
  );
};
export default NavigateButtons;
