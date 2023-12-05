import classNames from "classnames/bind";
import Select from "react-select";
import styles from "./SelectItem.module.scss";
import { useDispatch } from "react-redux";
import { changeSelect } from "../../../../store/procurementRegister/procRegister.slice";
import { QUERY_FILTERS } from "../../../../utils/constants/procurementRegister/";
import PropTypes from "prop-types";
import "./SelectItem.scss";

function SelectItem({ filters, name, open, index, query }) {
  const dispatch = useDispatch();
  const options = [
    { value: "", label: "Не выбрано" },
    ...filters.map((item) => ({ value: item, label: item })),
  ];
  const handlerSelect = (event) => {
    dispatch(changeSelect({ name, value: event.value }));
  };
  const baseStyle = classNames(styles.filters__item, `filters__item_${index}`);
  return (
    <div className={!open ? baseStyle : styles.filters__item}>
      <h2 className={styles.filters__item_title}>{name}</h2>
      <Select
        isSearchable={false}
        classNamePrefix="custom__select"
        value={options.find(
          (item) => item.value === query[QUERY_FILTERS[name]]
        )}
        options={options}
        onChange={handlerSelect}
      />
    </div>
  );
}

SelectItem.propTypes = {
  name: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.string),
  query: PropTypes.shape({
    clothes_type__name__in: PropTypes.string,
    location__name__in: PropTypes.string,
    purpose__name__in: PropTypes.string,
    raw_materials__name__in: PropTypes.string,
    purchase_type__name__in: PropTypes.string,
    status__name__in: PropTypes.string,
  }),
  index: PropTypes.number,
  open: PropTypes.bool,
};

export default SelectItem;
