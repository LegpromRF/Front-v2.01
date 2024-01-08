import Layout from "@layout/Layout";

import styles from "./Orders.module.scss";

import Status from "@components/Status/Status";
import TitleProfile from "@components/TitleProfile/TitleProfile";
import OrdersCard from "@components/OrdersCard/OrdersCard";
import HeaderProfile from "@components/HeaderProfile/HeaderProfile";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBids, handleBids } from "@store/orders/orders.slice";
import { useDispatch } from "react-redux";
import OrdersCardItem from "../../../components/CardItem/OrdersCardItem";
import { convertInputDateToIso, convertIsoDateToInput } from "../../../store/orders/utils";

const Orders = () => {
  const dispatch = useDispatch();
  const bids = getBids() || [];

  console.log(bids);

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
        <div className={styles.orders__cards}>
          {bids.map((bid, ind) => (
            <OrdersCardItem
              key={ind}
              img={bid.photo_urls?.[0]}
              title={bid.order_name}
              type={bid.product_type}
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
