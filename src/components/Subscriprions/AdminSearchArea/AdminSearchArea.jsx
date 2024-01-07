import { useEffect, useRef, useState } from "react";
import styles from "./AdminSearchArea.module.scss";
import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserData } from "../../../store/session/admindata.slice";
import SearchResults from "./SearchResults";

const AdminSearchArea = () => {
  const [isBtnAllUsersShow, setBtnAllUsersShow] = useState(true)
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const user = useSelector((state) => state.admindata.currentUser);
  const userOrders = useSelector((state) => state.admindata.currentUserOrders);
  

  useEffect(() => {
    // axios.get(_, { withCredentials: true }).then(res => {
    //   console.log(res);
    // })
  }, []);

  const handleAllUsers = async () => {
    let res = await axios.get(`${apiHOST}orders/admin/all/`, {
      withCredentials: true,
    });
    if (res.data)
      dispatch(setCurrentUserData({ user: null, orders: res.data }));
  };

  const handleCurrentUser = async (query) => {
    const handleDispatch = (orders) =>
      dispatch(
        setCurrentUserData({
          user: orders[0]
            ? {
                inn: orders[0].inn,
                phone: orders[0].phone,
                email: orders[0].email,
              }
            : null,
          orders,
        })
      );

    let res = await axios.get(`${apiHOST}orders/admin/all/?inn__in=${query}`, {
      withCredentials: true,
    });
    if (res.data.length) {
      handleDispatch(res.data);
      return;
    }

    res = await axios.get(
      `${apiHOST}orders/admin/all/?user_phone__in=${query}`,
      {
        withCredentials: true,
      }
    );
    if (res.data.length) {
      handleDispatch(res.data);
      return;
    }

    res = await axios.get(`${apiHOST}orders/admin/all/?email__in=${query}`, {
      withCredentials: true,
    });
    if (res.data.length) {
      handleDispatch(res.data);
      return;
    }

    dispatch(setCurrentUserData({ user: null, orders: null }));
  };

  const handleSearch = async () => {
    const query = inputRef.current?.value;
    if (query) {
      setBtnAllUsersShow(true)
      handleCurrentUser(query)
    }
    else {
      setBtnAllUsersShow(false)
      handleAllUsers()
    };
  };

  const showAllUsers = () => {
    if (inputRef.current) inputRef.current.value = ''
    handleSearch()
  }

  useEffect(() => {
    handleSearch()
  }, []);

  return (
    <div className={styles.search}>
      <label className={styles['search__input-area']}>
        <h6>Какого пользователя вы хотите найти?</h6>
        <div className={styles['search__input-area-body']}>
          <div className={styles['search__input']}>
            <input
              type="text"
              placeholder="ИНН/Телефон/Почта"
              ref={inputRef}
            />
            <button onClick={handleSearch}>Поиск</button>
          </div>
          {isBtnAllUsersShow ? <button className={styles['search__show-all-btn']} onClick={showAllUsers}>Показать всех пользователей</button> : ''}
        </div>
      </label>
      <SearchResults user={user} orders={userOrders} />
    </div>
  );
};
export default AdminSearchArea;
