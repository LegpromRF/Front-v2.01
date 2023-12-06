import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import Item from "../Item/Item";
import Loading from "../Loading/Loading";
import { getAllCards } from "@store/procurementRegister/procRegister.slice";
import PropTypes from "prop-types";
import styles from "./Items.module.scss";

function Items({ query, open }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.procRegister.cards);
  const loading = useSelector((state) => state.procRegister.loading);

  useEffect(() => {
    dispatch(getAllCards(query));
  }, [dispatch, query]);
  const classOpen = classNames(styles.cards, styles.cards_open);
  return (
    <>
      {loading && <Loading />}
      <div className={open ? classOpen : styles.cards}>
        {!loading &&
          cards.map((item) => <Item key={item.order_number} {...item} />)}
      </div>
    </>
  );
}

Items.propTypes = {
  query: PropTypes.string,
  open: PropTypes.bool,
};

export default Items;
