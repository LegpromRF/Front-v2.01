import { stagesCount } from "@store/orders/form.slice";

import styles from "./CreateOrder.module.scss";
import { useSelector } from "react-redux";
import { getFormField } from "../../store/orders/form.slice";

const NavigateButtons = ({ errors, handlePrevStage, formSubmitting }) => {
  const isEditMode = useSelector((state) => state.form.isEditMode);
  const stage = useSelector((state) => state.form.currentStage);

  const submitFormHandler = () => {
    formSubmitting()
  };

  return (
    <>
      <div className={styles.form__button}>
        {stage == stagesCount && (
          <div className={styles.form__buttonStartBLock}>
            <button type="submit" className={styles.form__buttonForward}>
              Сохранить как черновик
            </button>
          </div>
        )}
        {stage != 1 && (
          <button
            type="button"
            onClick={handlePrevStage}
            className={styles.form__buttonBack}
          >
            Назад
          </button>
        )}
        {stage == stagesCount ? (
          <button
            onClick={submitFormHandler}
            type="button"
            className={
              errors
                ? styles.form__buttonForward
                : styles.form__buttonForward_disabled
            }
          >
            {isEditMode ? "Сохранить" : "Создать"}
          </button>
        ) : (
          <button
            type="submit"
            className={
              errors
                ? styles.form__buttonForward
                : styles.form__buttonForward_disabled
            }
          >
            Вперед
          </button>
        )}
      </div>
    </>
  );
};
export default NavigateButtons;
