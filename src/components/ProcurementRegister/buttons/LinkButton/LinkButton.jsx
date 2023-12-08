import { Link } from "react-router-dom";
import styles from "./LinkButton.module.scss";
import PropTypes from "prop-types";

function LinkButton({ id }) {
  return (
    <Link to={`/profile/order/view_tz/${id}`}>
      <button className={styles.cards__item_footer_btn}>Перейти в заказ</button>
    </Link>
  );
}

LinkButton.propTypes = {
  id: PropTypes.number,
};

export default LinkButton;
