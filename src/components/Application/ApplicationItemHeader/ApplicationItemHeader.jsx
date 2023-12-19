import { useSelector } from "react-redux";
import ButtonOutline from "../../UI/ButtonOutline/ButtonOutline";
import styles from "./ApplicationItemHeader.module.scss";
import formatDate from "../../../utils/helpers/formatDate";

const ApplicationItemHeader = () => {
  const item = useSelector((state) => state.viewTz.item);

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Опубликовано: {formatDate(new Date(item.start_date)) || "-"}{" "}
        <span>(изменено 30 июня 2022 г.)</span>
      </p>

      <p className={styles.status}>
        Статус: <span>{item.status || "-"}</span>
      </p>

      <ButtonOutline title="Донор" onClick={() => console.log("click")} />
    </div>
  );
};

export default ApplicationItemHeader;
