import styles from "./ButtonAction.module.scss";

const ButtonAction = ({ title, icon, onClick }) => {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      <div className={styles.titleBlock}>{title}</div>
      <div className={styles.iconWrapper}>{icon}</div>
    </button>
  );
};

export default ButtonAction;
