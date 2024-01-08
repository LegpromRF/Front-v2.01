import { useState } from "react";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";

const OrdersCardItem = ({
  img,
  title,
  type,
  budget,
  circulation,
  createDate,
  status,
  id
}) => {
  
  return (
    <div className={styles['card__item-order']}>
      <div className={styles.card__body}>
      <Link to={`/profile/order/edit/${id}`} className={styles.card__edit}>Редактировать</Link>
        <div className={styles.card__image}>
          <img src={img} alt="Фото изделия" width={228} height={228} />
        </div>

        <h4 className={styles.card__title}>{title}</h4>
        <p className={styles.card__number}>{type}</p>
        <div className={styles.card__info}>
          <div className={styles.card__infoItem}>
            <div className={styles.card__label}>Количество</div>
            <div className={styles.card__description}>{circulation}</div>
          </div>
          <div className={styles.card__infoItem}>
            <div className={styles.card__label}>Бюджет</div>
            <div className={styles.card__description}>
              {budget} {budget || budget === 0 ? "₽" : ""}
            </div>
          </div>
          <div className={styles.card__infoItem}>
            <div className={styles.card__label}>Дата создания</div>
            <div className={styles.card__description}>{createDate}</div>
          </div>
          <div className={styles.card__infoItem}>
            <div className={styles.card__label}>Статус</div>
            <div className={styles.card__description}>{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrdersCardItem;
