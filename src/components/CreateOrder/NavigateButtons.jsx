import { stagesCount } from "@store/orderForm/form.slice";

import styles from "./CreateOrder.module.scss";
import { useSelector } from "react-redux";

const NavigateButtons = ({ errors, handlePrevStage }) => {
  const stage = useSelector((state) => state.form.currentStage);
  
  return (
    <div className={styles.form__button}>
      {stage != 1 ? (
        <button type="button" onClick={handlePrevStage} className={styles.form__buttonBack}>Назад</button>
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
          {stage == stagesCount ? 'Отправить' : 'Вперед'}
        </button>
    </div>
  );
};
export default NavigateButtons;
