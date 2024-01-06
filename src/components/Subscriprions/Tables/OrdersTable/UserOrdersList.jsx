import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUserOrders from "../../../../utils/services/profileData/getUserOrders";
import { setUserOrders } from "@store/session/userdata.slice";
import ContentTableWrapper from "../ContentTableWrapper";
import ReactSelect from "react-select";
import {
  ordersColumns,
  orderStatusTitles,
  ordersToDataList,
} from "../constants";
import StatusChangableField from "./StatusChangeField";

import styles from "../Tables.module.scss";
import "../Tables.scss";

//Таблица выставленных счетов
const UserOrdersList = ({ ordersViewList }) => {
  return (
    <div className={styles["table__list-wrapper"]}>
      <ul className={styles.table__list + " " + styles["table__list-orders"]}>
        {ordersColumns.map((colTitle, ind) =>
          colTitle == "ИНН/Телефон/Почта" ? (
            ""
          ) : (
            <li
              className={ind == 0 ? styles["table__list_sticky"] : ""}
              key={ind}
            >
              {colTitle}
            </li>
          )
        )}
        {ordersViewList.map((order) =>
          Object.keys(order).map((key, ind) => {
            if (key == "id") return "";
            if (key == "userdata") return "";
            const value = order[key];
            let className = "";
            if (value == orderStatusTitles.succeeded)
              className += styles["table__list_succeeded"];
            else if (value == orderStatusTitles.pending)
              className += styles["table__list_pending"];

            return (
              <li className={className} key={order.id + " " + ind}>
                {value}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
export default UserOrdersList;
