import styles from '../../CreateOrder.module.scss'

const TotalSum = ({ sum }) => {
  return (
    <div className={styles.form__item}>
      <div className={styles.form__sumWrapper}>
        <h3 className={styles.form__sumTitle}>
          <span>Общий бюджет:</span>
        </h3>
        <div className={styles.form__sum}>
          <span>{sum} руб.</span>
        </div>
      </div>
    </div>
  );
};
export default TotalSum;
