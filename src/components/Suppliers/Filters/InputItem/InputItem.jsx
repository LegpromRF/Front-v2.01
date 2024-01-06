import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { changeBudget } from "@store/procurementRegister/procRegister.slice";
import PropTypes from "prop-types";
import styles from "./InputItem.module.scss";

function InputItem({ name, open, query, disable }) {
  const dispatch = useDispatch();
  
  const componentClassName = `${styles.filters__input} ${open ? styles.filters__input_open : ''}`
  return (
    <div className={componentClassName}>
      <h2>{name}</h2>
      <input
        type="text"
        disabled={disable}
        // value={query.price_for_all__lte}
        // onChange={handleChangeMax}
      />
    </div>
  );
}

// InputItem.propTypes = {
//   open: PropTypes.bool,
//   query: PropTypes.shape({
//     price_for_all__gte: PropTypes.string,
//     price_for_all__lte: PropTypes.string,
//   }),
// };

export default InputItem;
