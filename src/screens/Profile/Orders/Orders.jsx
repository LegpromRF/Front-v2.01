import Layout from "@layout/Layout";

import styles from "./Orders.module.scss";

import Status from "@components/Status/Status";
import TitleProfile from "@components/TitleProfile/TitleProfile";
import OrdersCard from "@components/OrdersCard/OrdersCard";
import HeaderProfile from "@components/HeaderProfile/HeaderProfile";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getBids, handleBids } from "@store/orders/orders.slice";
import { useDispatch, useSelector } from "react-redux";
import OrdersCardItem from "../../../components/CardItem/OrdersCardItem";
import {
  convertInputDateToIso,
  convertIsoDateToInput,
} from "../../../store/orders/utils";
import axios from "axios";
import { apiEndpoints } from "../../../utils/constants/apiEndpoints";
import { getCurrentBid, searchBid } from "../../../store/orders/orders.slice";

const Orders = () => {
  const dispatch = useDispatch();
  
  const [isBtnAllUsersShow, setBtnAllUsersShow] = useState(false)
  const isAdmin = useSelector((state) => state.admindata.isAdmin);
  const inputRef = useRef(null);
  const currentBid = getCurrentBid();
  const bids = getBids() || [];
  const bidsView = currentBid ? [currentBid] : bids

  const handleSearch = () => {
    const query = inputRef.current?.value;
    dispatch(searchBid(query))
    setBtnAllUsersShow(Boolean(query))
  };

  const showAllUsers = () => {
    dispatch(searchBid(null))
    setBtnAllUsersShow(false)
  };

  useEffect(() => {
    dispatch(handleBids());
  }, [bids.length]);

  const [activeOrder, setActiveOrder] = useState(true);

  return (
    <>
      <h1>
        <title>Мои заказы - LegpromRF</title>
      </h1>
      <Layout>
        <div className={styles.orders}>
          <h1 className={styles.orders__title}>Ваши заявки</h1>
        </div>
        {isAdmin ? (
          <div className={styles.orders__search}>
            <label className={styles["orders__input-area"]}>
              <h6>Какую заявку вы хотите найти?</h6>
              <div className={styles["orders__input-area-body"]}>
                <div className={styles["orders__input"]}>
                  <input
                    type="text"
                    placeholder="id"
                    ref={inputRef}
                  />
                  <button onClick={handleSearch}>Поиск</button>
                </div>
                {isBtnAllUsersShow ? (
                  <button
                    className={styles["orders__show-all-btn"]}
                    onClick={showAllUsers}
                  >
                    Показать все заявки
                  </button>
                ) : (
                  ""
                )}
              </div>
            </label>
          </div>
        ) : (
          ""
        )}
        <div className={styles.orders__cards}>
          {bidsView.map((bid, ind) => (
            <OrdersCardItem
              key={ind}
              img={bid.photo_urls?.[0]}
              title={bid.order_name}
              type={bid.id}
              budget={bid.price_for_all}
              createDate={convertIsoDateToInput(bid.created_at)}
              circulation={bid.count}
              status={bid.status}
              id={bid.id}
            />
          ))}

          {/* <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          href={activeOrder ? '/profile/performers' : '/profile/applications'}
          status="В работе"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          href={activeOrder ? '/profile/performers' : '/profile/applications'}
          status="Закончен"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          href={activeOrder ? '/profile/performers' : '/profile/applications'}
          status="В работе"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          href={activeOrder ? '/profile/performers' : '/profile/applications'}
          status="Закончен"
        />   */}
        </div>
      </Layout>
    </>
  );
};

export default Orders;
