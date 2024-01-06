import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { changeBudget } from "@store/procurementRegister/procRegister.slice";
import PropTypes from "prop-types";
import styles from "./InputBudget.module.scss";

function InputBudget({ open, query }) {
  const dispatch = useDispatch();
  const handleChangeMin = (e) => {
    let inputValue = e.target.value;
    if (inputValue.startsWith("-") || inputValue.startsWith(".")) {
      inputValue = inputValue.slice(1);
    }
    if (/^\d*\.?\d*$/.test(inputValue)) {
      dispatch(changeBudget({ type: "min", value: inputValue }));
    }
  };
  const handleChangeMax = (e) => {
    let inputValue = e.target.value;
    if (inputValue.startsWith("-") || inputValue.startsWith(".")) {
      inputValue = inputValue.slice(1);
    }
    if (/^\d*\.?\d*$/.test(inputValue)) {
      dispatch(changeBudget({ type: "max", value: inputValue }));
    }
  };
  const classOpen = classNames(
    styles.filters__budget,
    styles.filters__budget_open
  );
  return (
    <div className={open ? classOpen : styles.filters__budget}>
      <h2>Бюджет</h2>
      <div className={styles.filters__budget_items}>
        <p>От:</p>
        <input
          type="text"
          value={query.price_for_all__gte}
          onChange={handleChangeMin}
        />
        <p>До:</p>
        <input
          type="text"
          value={query.price_for_all__lte}
          onChange={handleChangeMax}
        />
      </div>
    </div>
  );
}

InputBudget.propTypes = {
  open: PropTypes.bool,
  query: PropTypes.shape({
    price_for_all__gte: PropTypes.string,
    price_for_all__lte: PropTypes.string,
  }),
};

export default InputBudget;
