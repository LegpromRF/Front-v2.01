import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import Item from "../Item/Item";
import PaginationCards from "../PaginationCards/PaginationCards";
import Loading from "../Loading/Loading";
import { getCardsByPage } from "../../../utils/helpers/procurementRegister";
import {
  getAllCards,
  changePage,
} from "@store/procurementRegister/procRegister.slice";
import PropTypes from "prop-types";
import styles from "./Items.module.scss";

function Items({ query, open }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.procRegister.cards);
  const loading = useSelector((state) => state.procRegister.loading);
  const pageNumber = useSelector((state) => state.procRegister.pageNumber);

  useEffect(() => {
    dispatch(getAllCards(query));
  }, [dispatch, query, pageNumber]);
  const classOpen = classNames(styles.cards, styles.cards_open);
  return (
    <>
      {loading && <Loading />}
      <div ref={ref} className={open ? classOpen : styles.cards}>
        {!loading &&
          getCardsByPage(cards, pageNumber).map((item) => (
            <Item key={item.order_number} {...item} />
          ))}
      </div>
      {!loading && (
        <PaginationCards ref={ref} items={cards.length} page={pageNumber} />
      )}
    </>
  );
}

Items.propTypes = {
  query: PropTypes.string,
  open: PropTypes.bool,
};

export default Items;
