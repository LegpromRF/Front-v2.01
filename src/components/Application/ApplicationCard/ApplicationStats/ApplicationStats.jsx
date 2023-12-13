import StatsItem from "../StatsItem/StatsItem";
import styles from "./ApplicationStats.module.scss";

const ApplicationStats = () => {
  return (
    <div className={styles.list}>
      <div className={styles.label}>
        <p>Количество</p>

        <StatsItem title="260 шт." />
      </div>
      <div className={styles.label}>
        <p>Количество</p>

        <StatsItem title="до 960 000 ₽" />
      </div>
      <div className={styles.label}>
        <p>Количество</p>

        <StatsItem title="до 960 000 ₽" />
      </div>
      <div className={styles.label}>
        <p>Количество</p>

        <StatsItem title="до 25.07.2023" />
      </div>
      <div className={styles.label}>
        <p>Количество</p>

        <StatsItem title="Ярославская область" />
      </div>
    </div>
  );
};

export default ApplicationStats;
