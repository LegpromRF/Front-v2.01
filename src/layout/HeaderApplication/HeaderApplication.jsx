import { useSelector } from "react-redux";
import ButtonAction from "../../components/UI/ButtonAction/ButtonAction";
import ButtonBuySubscription from "../../components/UI/ButtonBuySubscription/ButtonBuySubscription";
import styles from "./HeaderApplication.module.scss";

const HeaderApplication = () => {
  const item = useSelector((state) => state.viewTz.item);

  return (
    <div className={styles.header}>
      <p className={styles.title}>
        Заявка № {item.order_number} {item.order_name || "-"}
      </p>

      <div className={styles.headerContent}>
        <ButtonAction
          title="Редактировать"
          icon={
            <img src="/icon/edit-icon.svg" alt="edit" width={11} height={10} />
          }
        />
        <ButtonAction
          title="Распечатать"
          icon={
            <img src="/icon/edit-icon.svg" alt="edit" width={11} height={10} />
          }
        />
        <ButtonAction
          title="Поделиться"
          icon={
            <img
              src="/icon/import-icon.svg"
              alt="edit"
              width={10}
              height={12}
            />
          }
        />
      </div>

      <div className={styles.btnBuyWrapper}>
        <ButtonBuySubscription price={4800} />
      </div>
    </div>
  );
};

export default HeaderApplication;
