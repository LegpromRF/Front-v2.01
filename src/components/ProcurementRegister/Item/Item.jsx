import PropTypes from "prop-types";
import {
  createMaterials,
  createDate,
} from "../../../utils/helpers/procurementRegister";
// import { createMaterials, createDate } from "../../utils";
import LinkButton from "../buttons/LinkButton/LinkButton";
import styles from "./Item.module.scss";

function Item(props) {
  return (
    <div className={styles.cards__item_container}>
      <div className={styles.cards__item}>
        <div className={styles.cards__item_img}>
          <img
            src="https://img.freepik.com/premium-photo/beautiful-fabric-taffeta-gently-folded-in-waves-crumpled-material-that-looks-like-silk-or-brocade-overflow-and-color-gradient-at-different-lighting-angles-fabric-for-sewing-clothes-and-curtains_565632-5306.jpg"
            alt={props.clothes_type}
          />
        </div>
        <div className={styles.cards__item_type}>{props.clothes_type}</div>
        <div className={styles.cards__item_open}>
          <div className={styles.cards__item_open_id}>
            №{props.order_number}
          </div>
          <div className={styles.cards__item_open_status}>{props.status}</div>
        </div>
        <div className={styles.cards__item_info}>
          <div className={styles.cards__item_info_purpose}>
            Сфера применения<span>{props.purpose}</span>
          </div>
          <div className={styles.cards__item_info_deadline}>
            Срок готовности
            <span>{createDate(props.deadline)}</span>
          </div>
          <div className={styles.cards__item_info_location}>
            Регион доставки<span>{props.location}</span>
          </div>
          <div className={styles.cards__item_info_plan}>
            Бюджет<span>{props.price_for_all} ₽</span>
          </div>
          <div className={styles.cards__item_info_count}>
            Объём<span>{props.count}</span>
          </div>
          <div className={styles.cards__item_info_materials}>
            Сырьё
            <span>
              {props.raw_materials &&
                createMaterials(props.raw_materials).map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
            </span>
          </div>
          <div className={styles.cards__item_info_price}>
            Цена за ед.<span>{props.price_per_unit} ₽</span>
          </div>
          <div className={styles.cards__item_info_public}>
            Опубликовано<span>{createDate(props.created_at)}</span>
          </div>
        </div>
      </div>
      <LinkButton />
    </div>
  );
}

Item.propTypes = {
  order_number: PropTypes.number,
  status: PropTypes.string,
  img: PropTypes.string,
  clothes_type: PropTypes.string,
  purpose: PropTypes.string,
  deadline: PropTypes.string,
  location: PropTypes.string,
  raw_materials: PropTypes.string || null,
  price_for_all: PropTypes.number,
  count: PropTypes.number,
  price_per_unit: PropTypes.number,
  created_at: PropTypes.string,
};

export default Item;
