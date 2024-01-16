import styles from './CardItem.module.scss'

const CardItem = ({ card }) => {
   return (
    <div className={styles.card__item}>
    <div className={styles.card__body}>
        <div className={styles.card__image}>
            <img src={card.img} alt="Фото изделия" width={228} height={228}/>
        </div>
        <h4 className={styles.card__title}>{card.title}</h4>
        <p className={styles.card__number}>{card.number}</p>
        <div className={styles.card__info}>
            <div className={styles.card__infoItem}>
                <div className={styles.card__label}>Количество</div>
                <div
                    className={styles.card__description}>{card.circulation}</div>
            </div>
            <div className={styles.card__infoItem}>
                <div className={styles.card__label}>Бюджет</div>
                <div className={styles.card__description}>{card.budget} {card.budget || card.budget === 0 ? '₽' : ''}</div>
            </div>
            <div className={styles.card__infoItem}>
                <div className={styles.card__label}>Срок поставки</div>
                <div
                    className={styles.card__description}>{card.dateChange}</div>
            </div>
            <div className={styles.card__infoItem}>
                <div className={styles.card__label}>Опубликовано</div>
                <div
                    className={styles.card__description}>{card.datePublished}</div>
            </div>
        </div>
    </div>
</div>
   )
}
export default CardItem