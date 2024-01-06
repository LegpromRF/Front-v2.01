import axios from "axios";
import ContentTableWrapper from "./ContentTableWrapper";

import styles from "./Tables.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { setUserSubscriprions } from "../../../store/session/userdata.slice";
import getUserSubscriptions from "../../../utils/services/profileData/getUserSubscriptions";
import { subsColumns, subsToDataList } from "./constants";

//Таблица активных подписок
const SubsTable = () => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.userdata.userSubscriprions) || [];
  const subsViewDataList = useMemo(() => {
    return subsToDataList(subs);
  }, [subs.length]);
  useEffect(() => {
    getUserSubscriptions().then((subs) => dispatch(setUserSubscriprions(subs)));
  }, []);

  
  return (
    <ContentTableWrapper title="Список активных подписок">
      <div className={styles["table__list-wrapper"]}>
        <ul className={styles.table__list + " " + styles["table__list-subs"]}>
          {subsColumns.map((col, ind) => (
            <li className={ind == 0 ? styles['table__list_sticky'] : ''} key={col}>{col}</li>
          ))}
          {subsViewDataList.map((data, ind) => (
            <>
              <li className={styles['table__list_sticky']} key={'a'+ind}>{data.name}</li>
              <li>
                <ul className={styles["table__list-subs_sublist"]}>
                  {data.functions.map((func, ind) => (
                    <li key={'b'+ind}>{func.name}</li>
                  ))}
                </ul>
              </li>
              <li>
                <ul className={styles["table__list-subs_sublist"]}>
                  {data.functions.map((func, ind) => (
                    <li key={'c'+ind}>{func.date}</li>
                  ))}
                </ul>
              </li>
            </>
          ))}
        </ul>
      </div>
    </ContentTableWrapper>
  );
};
export default SubsTable;
