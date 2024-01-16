import { useSelector } from "react-redux";
import StatsItem from "../StatsItem/StatsItem";
import styles from "./ApplicationStats.module.scss";

const ApplicationStats = () => {
  const item = useSelector((state) => state.viewTz.item);

  return (
    <div className={styles.list}>
      <div className={styles.label}>
        <p>Количество</p>

        <StatsItem title={`${item.count || '-'} шт.`} />
      </div>
      <div className={styles.label}>
        <p>Цена за шт.</p>

        <StatsItem title={`${item.price_per_unit || "-"} ₽`} />
      </div>
      <div className={styles.label}>
        <p>Плановый бюджет</p>

        <StatsItem title={`${item.price_for_all || "-"} ₽`} />
      </div>
      <div className={styles.label}>
        <p>Срок поставки</p>

        <StatsItem
          title={`${item.deadline ? `до ${new Date(item.deadline).toLocaleDateString()}` : "-"}`}
        />
      </div>
      <div className={styles.label}>
        <p>Регион доставки</p>

        <StatsItem title={item.location} />
      </div>
    </div>
  );
};

export default ApplicationStats;
