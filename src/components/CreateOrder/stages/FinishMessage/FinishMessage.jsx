import { useSelector } from "react-redux";
import styles from "./FinishMessage.module.scss";
import { Link } from "react-router-dom";

const FinishMessage = () => {
  const stage = useSelector((state) => state.form.currentStage);
  const isEditMode = useSelector((state) => state.form.isEditMode);
  const isFormFetchingSuccess = useSelector(
    (state) => state.form.isFormFetchingSuccess
  );

  const isHide = stage != 6;
  if (isHide) return "";

  return (
    <div className={styles["message__wrapper"]}>
      <div className={styles["message__text"]}>
        {isEditMode
          ? isFormFetchingSuccess
            ? "Заявка отредактирована!"
            : "К сожалению сейчас не вышло отредактировать заявку, попробуйте позже"
          : isFormFetchingSuccess
          ? "Заявка отправлена!"
          : "К сожалению сейчас не вышло отправить заявку, попробуйте позже"}
      </div>
      <button className={styles["message__btn"]}>
        <Link to={"/profile/order/all"}>Перейти к созданным заявкам</Link>
      </button>
    </div>
  );
};
export default FinishMessage;
