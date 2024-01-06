import downArrowImg from "../../img/arrow-down.png";
import styles from "./Card.module.scss";
import RatingWrapper from "./RatingWrapper";
import ActivitySvg from "./Svgs/InfoIcons/ActivitySvg";
import DiscoverySvg from "./Svgs/InfoIcons/DiscoverySvg";
import GraphSvg from "./Svgs/InfoIcons/GraphSvg";
import MessageSvg from "./Svgs/InfoIcons/MessageSvg";
import ScanSvg from "./Svgs/InfoIcons/ScanSvg";
import TicketSvg from "./Svgs/InfoIcons/TicketSvg";

// scan
// ticket
const Card = ({ rating }) => {
  return (
    <li className={styles["card-container"]}>
      <div className={styles.card}>
        <div className={styles.card__logo}>
          <img
            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1703116800&semt=sph"
            alt=""
          />
        </div>
        <div className={styles.card__body}>
          <div className={styles.card__company}>
            <h2 className={styles["card__company-name"]}>Bend</h2>
            <div className={styles["card__company-rating"]} data-rating="4">
              <RatingWrapper rating={rating} />
            </div>
          </div>
          <div className={styles["card__info"]}>
            <div className={styles["card__info-block"]}>
              <h4 className={styles["card__info-title"]}>
                Регион производства
              </h4>
              <p className={styles["card__info-description"]}>
                Россия, Ивановская область
              </p>
            </div>
            <div>
              <h4 className={styles["card__info-title"]}>Специализация</h4>
              <p className={styles["card__info-description"]}>
                Производство одежды
              </p>
            </div>
          </div>
        </div>
        <div className={styles["card__buttons"]}>
          <ul className={styles["card__buttons-table"]}>
            <li>
              <ActivitySvg isActive={false} />
            </li>
            <li>
              <DiscoverySvg isActive={true} />
            </li>
            <li>
              <GraphSvg isActive={true} />
            </li>
            <li>
              <MessageSvg isActive={true} />
            </li>
            <li>
              <ScanSvg isActive={true} />
            </li>
            <li>
              <TicketSvg isActive={true} />
            </li>
          </ul>
          <button className={styles["card__buttons-main"]}>
            Подробнее <img src={downArrowImg} alt="" />
          </button>
        </div>
      </div>
    </li>
  );
};
export default Card;
