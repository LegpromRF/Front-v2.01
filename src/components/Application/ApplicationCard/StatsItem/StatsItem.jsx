import styles from "./StatsItem.module.scss";

const StatsItem = ({ title }) => {
  return <div className={styles.item}>{title}</div>;
};

export default StatsItem;
