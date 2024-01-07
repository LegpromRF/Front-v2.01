import styles from './InfoCard.module.scss'

const InfoCard = () => {
   return (
      <li className={styles['info-card']}>
        <div className={styles['info-card__body']}>
          <h4 className={styles['info-card__title']}>ДОЛГО ИСКАТЬ ПОСТАВЩИКА - РАЗМЕСТИТЕ ЗАКАЗ</h4>
          <p className={styles['info-card__description']}>299руб на 90 дней для новых пользователей</p>
        </div>
        <button className={styles['info-card__button']}>Заказы</button>
      </li>
   )
}
export default InfoCard