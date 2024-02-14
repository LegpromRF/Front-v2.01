import Layout from "@layout/Layout";

import styles from "./Orders.module.scss";

import Status from "@components/Status/Status";
import TitleProfile from "@components/TitleProfile/TitleProfile";
import OrdersCard from "@components/OrdersCard/OrdersCard";
import HeaderProfile from "@components/HeaderProfile/HeaderProfile";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleBids } from "@store/orders/orders.slice";
import { useDispatch, useSelector } from "react-redux";
import OrdersCardItem from "@components/CardItem/OrdersCardItem";
import {
  convertInputDateToIso,
  convertIsoDateToInput,
} from "../../../store/orders/utils";
import { searchBid } from "@store/orders/orders.slice";
import { setFormFetchingSuccess } from "@store/orders/form.slice";
import { CircularProgress, Pagination, styled } from "@mui/material";
import {
  changeAdminBidsPage,
  changeBidsPage,
  changeStatus,
  handleAdminBids,
} from "../../../store/orders/orders.slice";
import InfoMessage from "./InfoMessage";
import ReactSelect from "react-select";

const MyPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
});

const Orders = ({ forAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isBtnAllUsersShow, setBtnAllUsersShow] = useState(false);

  const isAdmin = useSelector((state) => state.admindata.isAdmin);
  const { isFormFetchingSuccess } = useSelector((state) => state.form);
  const inputRef = useRef(null);
  const searchAreaDivRef = useRef(null);

  
  const {
    currentBid,
    bids,
    bidsPageNumber,
    bidsCountPages,
    isBidsLoading,
    adminBids,
    adminBidsPageNumber,
    adminBidsCountPages,
    isAdminBidsLoading,
    query: { status__name__in: statusQuery }
  } = useSelector((store) => store.orders);

  const bidsView = currentBid
    ? [currentBid]
    : isAdmin && forAdmin
    ? adminBids
    : bids;

  const pageNumber = isAdmin && forAdmin ? adminBidsPageNumber : bidsPageNumber;
  const countPages = isAdmin && forAdmin ? adminBidsCountPages : bidsCountPages;
  const isLoading = isAdmin && forAdmin ? isAdminBidsLoading : isBidsLoading;

  useEffect(() => {
    if (forAdmin && isAdmin === false) navigate("/profile/order/all");
  }, [isAdmin, forAdmin]);

  const handleSearch = () => {
    const query = inputRef.current?.value;
    dispatch(searchBid(query));
    setBtnAllUsersShow(Boolean(query));
  };

  const showAllUsers = () => {
    if (inputRef.current) inputRef.current.value = "";
    dispatch(searchBid(null));
    setBtnAllUsersShow(false);
  };

  useEffect(() => {
    dispatch(handleBids());
  }, [bids.length, bidsCountPages, bidsPageNumber, statusQuery]);

  useEffect(() => {
    dispatch(handleAdminBids());
  }, [adminBids.length, adminBidsCountPages, adminBidsPageNumber, statusQuery]);

  useEffect(() => {
    showAllUsers();
  }, []);

  useEffect(() => {
    if (isFormFetchingSuccess === true || isFormFetchingSuccess === false) {
      dispatch(setFormFetchingSuccess(null));
    }
  }, [isFormFetchingSuccess]);

  const handlePagination = useCallback(
    (event, value) => {
      searchAreaDivRef.current?.scrollIntoView({ behavior: "auto" });
      isAdmin && forAdmin
        ? dispatch(changeAdminBidsPage(value))
        : dispatch(changeBidsPage(value));
    },
    [isAdmin, forAdmin]
  );

  const kindFilters = [
    { value: '', label: "Все" },
    { value: "Черновик", label: "Черновик" },
    { value: "На модерации", label: "На модерации" },
    { value: "Открыт", label: "Открыт" },
    { value: "Завершен", label: "Завершен" },
  ];

  const handleSelect = (event) => {
    dispatch(changeStatus(event.value))
    // setFilters(event.value);
  };

  useEffect(() => {
    dispatch(changeStatus(''))
  }, [forAdmin])

  let OrderCardsContent;

  if (isLoading)
    OrderCardsContent = () => (
      <div className={styles.orders__loading}>
        <CircularProgress size={50} />
      </div>
    );
  else
    OrderCardsContent = () =>
      (currentBid === undefined || !bidsView.length) ? (
        <p className={styles["orders__search-mess"]}>
          К сожалению заявки не найдены
        </p>
      ) : (
        bidsView.map((bid, ind) => (
          <OrdersCard
            key={bid.id}
            imagePreviewSrc={bid.photo_urls?.[0] ?? ""}
            name={bid.order_name}
            clothesType={bid.clothes_type}
            budget={bid.price_for_all}
            isVerified={bid.is_verified}
            createDate={convertIsoDateToInput(bid.created_at)}
            status={bid.status} //TODO статус цифрой
            id={bid.id}
            count={bid.count}
          />
        ))
      );

  return (
    <>
      <h1>
        <title>Мои заказы - LegpromRF</title>
      </h1>
      <Layout>
        <div className={styles.orders}>
          <h1 className={styles.orders__title}>
            {isAdmin && forAdmin ? "Все заявки" : "Ваши заявки"}
          </h1>
        </div>
        <InfoMessage />

        <div className={styles.orders__search} ref={searchAreaDivRef}>
          <label className={styles["orders__input-area"]}>
            <h6>Какую заявку вы хотите найти?</h6>
            <div className={styles["orders__input-area-body"]}>
              <div className={styles["orders__input"]}>
                <input type="number" placeholder="№" ref={inputRef} />
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
          <div className={styles.orders__select}>
            <ReactSelect
              options={kindFilters}
              value={kindFilters.find((item) => statusQuery == item.value)}
              // classNamePrefix={"table__filters"}
              // value={'Черновик'}

              onChange={handleSelect}
            />
          </div>
        </div>

        <div className={styles.orders__cards}>
          <OrderCardsContent />
        </div>
        {countPages > 1 && (
          <MyPagination
            count={countPages}
            size="large"
            page={pageNumber}
            hidden={true}
            onChange={handlePagination}
          />
        )}
      </Layout>
    </>
  );
};

export default Orders;
