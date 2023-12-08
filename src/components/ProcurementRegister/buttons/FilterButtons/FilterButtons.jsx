import { memo } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { openFilters } from "@store/procurementRegister/procRegister.slice";
import { clearFilters } from "@store/procurementRegister/procRegister.slice";
import cross_filters from "../../../../../public/ProcurementRegiste/icons/cross_filters.svg";
import filter_btn from "../../../../../public/ProcurementRegiste/icons/filter_btn.svg";
import arrow from "../../../../../public/ProcurementRegiste/icons/arrow.svg";
import styles from "./FilterButtons.module.scss";

const FilterButtons = memo(function FilterButtons({ open }) {
  const dispatch = useDispatch();

  const handlerButtonOpen = () => {
    dispatch(openFilters(open));
  };
  const handlerButtonClear = () => {
    dispatch(clearFilters());
  };
  return (
    <div className={styles.filters__buttons}>
      <button
        className={styles.filters__buttons_open}
        onClick={handlerButtonOpen}
      >
        <img src={open ? arrow : filter_btn} alt="filters" />
      </button>
      <button
        onClick={handlerButtonClear}
        className={styles.filters__buttons_close}
      >
        <img src={cross_filters} alt="cross" />
      </button>
    </div>
  );
});

FilterButtons.propTypes = {
  open: PropTypes.bool,
};
export default FilterButtons;
