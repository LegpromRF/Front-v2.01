import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import { createFilters } from "../../../utils/helpers/procurementRegister";
import { getAllFilters } from "../../../store/procurementRegister/procRegister.slice";
import SelectItem from "./SelectItem/SelectItem.jsx";
import FilterButtons from "../buttons/FilterButtons/FilterButtons";
import InputQuantity from "./InputQuantity/InputQuantity";
import InputBudget from "./InputBudget/InputBudget";
import InputDate from "./InputDate/InputDate";
import PropTypes from "prop-types";
import styles from "./Filters.module.scss";

function Filters({ open, query }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.procRegister.filters);
  useEffect(() => {
    dispatch(getAllFilters());
  }, [dispatch]);

  return (
    <div className={styles.filters__container}>
      <div
        className={
          open
            ? classNames(styles.filters, styles.filters_open)
            : styles.filters
        }
      >
        {createFilters(filters).map((filter, index) => (
          <SelectItem
            key={index}
            index={index}
            filters={filters[filter]}
            name={filter}
            open={open}
            query={query}
          />
        ))}
        <InputQuantity open={open} query={query} />
        <InputBudget open={open} query={query} />
        <InputDate open={open} query={query} />
      </div>
      <FilterButtons open={open} />
    </div>
  );
}

Filters.propTypes = {
  query: PropTypes.shape({
    clothes_type__name__in: PropTypes.string,
    location__name__in: PropTypes.string,
    purpose__name__in: PropTypes.string,
    raw_materials__name__in: PropTypes.string,
    purchase_type__name__in: PropTypes.string,
    status__name__in: PropTypes.string,
  }),
  open: PropTypes.bool,
};

export default Filters;
