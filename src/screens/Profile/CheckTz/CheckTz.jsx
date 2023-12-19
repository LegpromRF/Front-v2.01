import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCard,
  getOther,
  getRequirements,
  getTechnology,
  getFiles,
} from "../../../store/viewTz/viewTz.slice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../../components/ProcurementRegister/Loading/Loading";
import styles from "./CheckTz.module.scss";
import HeaderApplication from "../../../layout/HeaderApplication/HeaderApplication";
import ApplicationItemHeader from "../../../components/Application/ApplicationItemHeader/ApplicationItemHeader";
import ApplicationCard from "../../../components/Application/ApplicationCard/ApplicationCard";

const CheckTz = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.viewTz.item);
  const loading = useSelector((state) => state.viewTz.loading);

  useEffect(() => {
    dispatch(getCard(params.itemId));
    dispatch(getTechnology(params.itemId));
    dispatch(getOther(params.itemId));
    dispatch(getRequirements(params.itemId));
    dispatch(getFiles(params.itemId));
  }, [dispatch, params.itemId]);

  return (
    <div>
      {loading && item && (
        <div className={styles.checktz__loading}>
          <Loading />
        </div>
      )}
      {!loading && (
        <div className="page application application__container">
          <HeaderApplication />

          <ApplicationItemHeader />

          <ApplicationCard />
        </div>
      )}
    </div>
  );
};

export default CheckTz;
