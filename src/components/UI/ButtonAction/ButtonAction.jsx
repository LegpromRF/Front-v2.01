import styles from "./ButtonAction.module.scss";

const ButtonAction = ({ title, icon }) => {
  return (
    <button className={styles.wrapper}>
      <div className={styles.titleBlock}>{title}</div>
      <div className={styles.iconWrapper}>{icon}</div>
    </button>
  );
};

export default ButtonAction;
