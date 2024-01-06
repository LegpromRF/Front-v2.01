import { useSelector } from "react-redux";
import styles from "./ApplicationContacts.module.scss";

const ApplicationContacts = ({ style }) => {
  const { customer } = useSelector((state) => state.viewTz);

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.item}>
        <p className={styles.itemLabel}>Контактное лицо</p>
        <p className={styles.itemValue}>{customer.name || "-"}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.itemLabel}>Электронная почта</p>
        <a className={styles.itemValue} href={`mailto:${customer.email}`}>
          {customer.email || "-"}
        </a>
      </div>
      <div className={styles.item}>
        <p className={styles.itemLabel}>Контактный телефон</p>
        <a className={styles.itemValue} href={`tel:${customer.phone}`}>
          {customer.phone || "-"}
        </a>
      </div>
      <div className={styles.item}>
        <p className={styles.itemLabel}>Telegram</p>
        <p className={styles.itemValue}>{customer.telegram || "-"}</p>
      </div>
    </div>
  );
};

export default ApplicationContacts;
