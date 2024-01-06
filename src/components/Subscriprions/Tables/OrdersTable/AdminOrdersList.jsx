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
const AdminOrdersList = ({ ordersViewList }) => {
  const currentUser = useSelector((state) => state.admindata.currentUser);
  const isFullTable = !currentUser && ordersViewList; //Чтобы показывать инн/телефон/почту

  return (
    <div className={styles["table__list-wrapper"]}>
      <ul
        className={
          styles.table__list +
          " " +
          styles["table__list-orders"] +
          " " +
          (isFullTable ? styles["table__list-orders_full"] : "")
        }
      >
        {ordersColumns.map((colTitle, ind) =>
          !isFullTable && colTitle == "ИНН/Телефон/Почта" ? (
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

            const isFieldStatus = key == "status";
            const isFieldUserdata = key == "userdata";
            if (isFieldUserdata && !isFullTable) return "";
            const value = order[key];
            let className = "";
            if (isFieldStatus && value == orderStatusTitles.succeeded)
              className += styles["table__list_succeeded"];
            else if (isFieldStatus && value == orderStatusTitles.pending)
              className += styles["table__list_pending"];

            if (isFieldStatus)
              return (
                <StatusChangableField
                  className={className}
                  initialValue={value}
                  orderId={order.id}
                  key={String(order.id)+ind}
                />
              );
            
            if (isFieldUserdata)
              return (
                <li key={String(order.id)+ind}>
                  <ul className={styles["table__list-orders_sublist"]}>
                    <li className={!value?.inn ? styles["table__list-orders_sublist_empty"] : ''}>{value?.inn || ''}</li>
                    <li className={!value?.phone ? styles["table__list-orders_sublist_empty"] : ''}>{value?.phone || ''}</li>
                    <li className={!value?.email ? styles["table__list-orders_sublist_empty"] : ''}>{value?.email || ''}</li>
                  </ul>
                </li>
              );
              
            return (
              <li className={className} key={String(order.id)+ind}>
                {value}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
export default AdminOrdersList;
