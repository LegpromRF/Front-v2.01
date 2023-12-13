import styles from "./Characteristic.module.scss";

const Characteristic = ({ parameter, value }) => {
  return (
    <div className={styles.wrapper}>
      <p>{parameter}</p>
      <span>{value}</span>
    </div>
  );
};

export default Characteristic;
