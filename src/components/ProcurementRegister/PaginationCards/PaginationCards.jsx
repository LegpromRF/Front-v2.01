import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { countPages } from "../../../utils/helpers/procurementRegister";
import { changePage } from "@store/procurementRegister/procRegister.slice";
import PropTypes from "prop-types";
import styles from "./PaginationCards.module.scss";

const PaginationCards = forwardRef(function PaginationCards(props, ref) {
  const dispatch = useDispatch();
  const handlerPagination = (_, value) => {
    ref.current.scrollIntoView({ behavior: "auto" });
    dispatch(changePage(value));
  };

  return (
    <div className={styles.pagination}>
      <Pagination
        count={countPages(props.items)}
        variant="outlined"
        shape="rounded"
        page={props.page}
        siblingCount={0}
        onChange={handlerPagination}
      />
    </div>
  );
});

PaginationCards.propTypes = {
  items: PropTypes.number,
  page: PropTypes.number,
};

export default PaginationCards;
