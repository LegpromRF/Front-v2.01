import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { changeDate } from "@store/procurementRegister/procRegister.slice";
import PropTypes from "prop-types";
import styles from "./InputDate.module.scss";

function InputDate({ open, query }) {
  const dispatch = useDispatch();
  const handleChangeMin = (e) => {
    const target = e.target.value;
    dispatch(changeDate({ type: "min", value: target }));
  };
  const handleChangeMax = (e) => {
    const target = e.target.value;
    dispatch(changeDate({ type: "max", value: target }));
  };
  const classOpen = classNames(styles.filters__date, styles.filters__date_open);
  return (
    <div className={open ? classOpen : styles.filters__date}>
      <h2>Срок поставки</h2>
      <div className={styles.filters__date_items}>
        <p>От:</p>
        <input
          type="date"
          value={query.deadline__gte.split("T")[0]}
          onChange={handleChangeMin}
        />
        <p>До:</p>
        <input
          type="date"
          value={query.deadline__lte.split("T")[0]}
          onChange={handleChangeMax}
        />
      </div>
    </div>
  );
}

InputDate.propTypes = {
  open: PropTypes.bool,
  query: PropTypes.shape({
    deadline__gte: PropTypes.string,
    deadline__lte: PropTypes.string,
  }),
};

export default InputDate;
