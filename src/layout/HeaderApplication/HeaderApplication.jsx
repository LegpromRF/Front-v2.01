import ButtonAction from "../../components/UI/ButtonAction/ButtonAction";
import ButtonBuySubscription from "../../components/UI/ButtonBuySubscription/ButtonBuySubscription";
import styles from "./HeaderApplication.module.scss";

const HeaderApplication = () => {
  return (
    <div className={styles.header}>
      <p>Заявка № ХХХХХХ Пошив платья для официантов</p>

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
        <ButtonBuySubscription
          price={4800}
        />
      </div>
    </div>
  );
};

export default HeaderApplication;
