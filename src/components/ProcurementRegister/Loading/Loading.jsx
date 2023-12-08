import styles from "./Loading.module.scss";
function Loading() {
  return (
    <div className={styles.loading}>
      <span className={styles.loading_first}></span>
      <span className={styles.loading_second}></span>
      <span className={styles.loading_third}></span>
    </div>
  );
}

export default Loading;
