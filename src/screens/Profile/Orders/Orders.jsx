import Layout from "@layout/Layout";

import styles from "./Orders.module.scss";

import Status from "@components/Status/Status";
import TitleProfile from "@components/TitleProfile/TitleProfile";
import OrdersCard from "@components/OrdersCard/OrdersCard";
import HeaderProfile from "@components/HeaderProfile/HeaderProfile";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getBids, handleBids } from "@store/orders/orders.slice";
import { useDispatch, useSelector } from "react-redux";
import OrdersCardItem from "@components/CardItem/OrdersCardItem";
import {
  convertInputDateToIso,
  convertIsoDateToInput,
} from "../../../store/orders/utils";
import { getCurrentBid, searchBid } from "@store/orders/orders.slice";
import { setFormFetchingSuccess } from "@store/orders/form.slice";
import { Pagination, styled } from "@mui/material";
import { changeOrdersPage } from "../../../store/orders/orders.slice";
import InfoMessage from "./InfoMessage";

const MyPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
});

const Orders = () => {
  const dispatch = useDispatch();

  const [isBtnAllUsersShow, setBtnAllUsersShow] = useState(false);

  const isAdmin = useSelector((state) => state.admindata.isAdmin);
  const { isFormFetchingSuccess } = useSelector((state) => state.form);
  const inputRef = useRef(null);
  const ordersDivRef = useRef(null);

  const currentBid = getCurrentBid();
  const { bids, pageNumber, countPages } = useSelector((store) => store.orders);
  const bidsView = currentBid ? [currentBid] : bids;

  const handleSearch = () => {
    const query = inputRef.current?.value;
    dispatch(searchBid(query));
    setBtnAllUsersShow(Boolean(query));
  };

  const showAllUsers = () => {
    dispatch(searchBid(null));
    setBtnAllUsersShow(false);
  };

  useEffect(() => {
    dispatch(handleBids());
  }, [bids.length, pageNumber]);

  useEffect(() => {
    if (isFormFetchingSuccess === true || isFormFetchingSuccess === false) {
      dispatch(setFormFetchingSuccess(null));
    }
  }, [isFormFetchingSuccess]);

  const handlePagination = (event, value) => {
    ordersDivRef.current?.scrollIntoView({ behavior: "auto" });
    dispatch(changeOrdersPage(value));
  };

  return (
    <>
      <h1>
        <title>Мои заказы - LegpromRF</title>
      </h1>
      <Layout>
        <div className={styles.orders}>
          <h1 className={styles.orders__title}>Ваши заявки</h1>
        </div>
        <InfoMessage />

        {isAdmin && (
          <div className={styles.orders__search}>
            <label className={styles["orders__input-area"]}>
              <h6>Какую заявку вы хотите найти?</h6>
              <div className={styles["orders__input-area-body"]}>
                <div className={styles["orders__input"]}>
                  <input type="text" placeholder="id" ref={inputRef} />
                  <button onClick={handleSearch}>Поиск</button>
                </div>
                {isBtnAllUsersShow && (
                  <button
                    className={styles["orders__show-all-btn"]}
                    onClick={showAllUsers}
                  >
                    Показать все заявки
                  </button>
                )}
              </div>
            </label>
          </div>
        )}
        <div className={styles.orders__cards} ref={ordersDivRef}>
          {bidsView.map((bid, ind) => (
            <OrdersCard
              key={bid.id}
              // imagePreviewSrc={bid.photo_urls?.[0] ?? ''}
              imagePreviewSrc={
                ind == 0
                  ? "https://i.pinimg.com/564x/d1/db/7f/d1db7fba9d45c5831553dfa2ae6a5bc1.jpg"
                  : ""
              }
              name={bid.order_name}
              clothesType={bid.clothes_type}
              budget={bid.price_for_all}
              isVerified={bid.is_verified}
              createDate={convertIsoDateToInput(bid.created_at)}
              status={bid.status} //TODO статус цифрой
              id={bid.id}
              count={bid.count}
            />
          ))}

          {/* <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          
          status="В работе"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          
          status="Закончен"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          
          status="В работе"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          
          status="Закончен"
        />  */}
        </div>
        {/* {countPages > 1 ? ( */}
        <MyPagination
          count={countPages}
          size="large"
          page={pageNumber}
          hidden={true}
          onChange={handlePagination}
        />
        {/* ) : (
        ""
      )} */}
      </Layout>
    </>
  );
};

export default Orders;
