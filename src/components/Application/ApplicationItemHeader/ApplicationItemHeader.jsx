import ButtonOutline from "../../UI/ButtonOutline/ButtonOutline";
import styles from "./ApplicationItemHeader.module.scss";

const ApplicationItemHeader = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Опубликовано: 29 июня 2022 г. <span>(изменено 30 июня 2022 г.)</span>
      </p>

      <p className={styles.status}>
        Статус: <span>Открыто</span>
      </p>

      <ButtonOutline title="Донор" onClick={() => console.log("click")} />
    </div>
  );
};

export default ApplicationItemHeader;
