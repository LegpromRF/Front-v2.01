import styles from "./UnavailableСontacts.module.scss";

const UnavailableСontacts = ({ style }) => {
  return (
    <div className={styles.wrapper} style={style}>
      <p>
        Прямые контакты заказчика доступны в этом поле сразу после активации
        подписки
      </p>
    </div>
  );
};

export default UnavailableСontacts;
