import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { changeQuantity } from "@store/procurementRegister/procRegister.slice";
import PropTypes from "prop-types";
import styles from "./InputQuantity.module.scss";

function InputQuantity({ open, query }) {
  const dispatch = useDispatch();
  const handleChangeMin = (e) => {
    const target = e.target.value;
    if (target.match(/^\d*$/)) {
      dispatch(changeQuantity({ type: "min", value: target }));
    }
  };
  const handleChangeMax = (e) => {
    const target = e.target.value;
    if (target.match(/^\d*$/)) {
      dispatch(changeQuantity({ type: "max", value: target }));
    }
  };
  const classOpen = classNames(
    styles.filters__quantity,
    styles.filters__quantity_open
  );
  return (
    <div className={open ? classOpen : styles.filters__quantity}>
      <h2>Количество</h2>
      <div className={styles.filters__quantity_items}>
        <p>От:</p>
        <input
          type="text"
          value={query.count__gte}
          onChange={handleChangeMin}
        />
        <p>До:</p>
        <input
          type="text"
          value={query.count__lte}
          onChange={handleChangeMax}
        />
      </div>
    </div>
  );
}

InputQuantity.propTypes = {
  open: PropTypes.bool,
  query: PropTypes.shape({
    count__gte: PropTypes.string,
    count__lte: PropTypes.string,
  }),
};

export default InputQuantity;
