import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUserOrders from "../../../../utils/services/profileData/getUserOrders";
import { setUserOrders } from "@store/session/userdata.slice";
import ContentTableWrapper from "../ContentTableWrapper";
import ReactSelect from "react-select";
import {
  ordersColumns,
  ordersPerPage,
  orderStatusTitles,
  ordersToDataList,
} from "../constants";

import styles from "../Tables.module.scss";
import "../Tables.scss";
import AdminOrdersList from "./AdminOrdersList";
import UserOrdersList from "./UserOrdersList";
import { Pagination, styled } from "@mui/material";

const MyPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
});

//Таблица выставленных счетов
const OrdersTable = ({ forAdmin }) => {
  const kindFilters = [
    { value: "Все", label: "Все" },
    { value: orderStatusTitles.pending, label: "Не оплаченные" },
    { value: orderStatusTitles.succeeded, label: "Оплаченные" },
  ];
  // // ...selectOptions.map((item) => ({ value: item, label: item })),
  const [filters, setFilters] = useState(kindFilters[0].value);
  const [page, setPage] = useState(1);

  // const dispatch = useDispatch();
  const adminOrders =
    useSelector((state) => state.admindata.currentUserOrders) || [];
  const userOrders = useSelector((state) => state.userdata.userOrders) || [];
  const orders = forAdmin ? adminOrders : userOrders;

  useEffect(() => {
    setPage(1)
  }, [filters, orders.length])
  
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) => filters == "Все" || orderStatusTitles[order.status] == filters
    );
  }, [filters, orders]);

  const ordersViewList = useMemo(() => {
    const pageOrders = filteredOrders.slice(
      (page - 1) * ordersPerPage,
      page * ordersPerPage
    );

    return ordersToDataList(pageOrders);
  }, [page, filters, orders]);

  const handleSelect = (event) => {
    setFilters(event.value);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const pagesCount = Math.ceil(filteredOrders.length / ordersPerPage);  

  return (
    <>
      <ContentTableWrapper title="Выставленные счета">
        <div className={styles["table__filters"]}>
          <div className={styles["table__filters-select"]}>
            <ReactSelect
              options={kindFilters}
              classNamePrefix={"table__filters"}
              value={kindFilters.find((item) => filters === item.value)}
              onChange={handleSelect}
            />
          </div>
        </div>
        {forAdmin ? (
          <AdminOrdersList ordersViewList={ordersViewList} />
        ) : (
          <UserOrdersList ordersViewList={ordersViewList} />
        )}
      </ContentTableWrapper>
      {pagesCount > 1 ? (
        <MyPagination
          count={pagesCount}
          size="large"
          page={page}
          hidden={true}
          onChange={handlePagination}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default OrdersTable;
