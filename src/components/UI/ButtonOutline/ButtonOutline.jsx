import styles from "./ButtonOutline.module.scss";

const ButtonOutline = ({ title, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonOutline;
