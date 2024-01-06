import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCard,
  getOther,
  getRequirements,
  getTechnology,
  getFiles,
  getCustomer,
  getPaylink,
  getSource,
} from "../../../store/viewTz/viewTz.slice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../../components/ProcurementRegister/Loading/Loading";
import styles from "./CheckTz.module.scss";
import HeaderApplication from "../../../layout/HeaderApplication/HeaderApplication";
import ApplicationItemHeader from "../../../components/Application/ApplicationItemHeader/ApplicationItemHeader";
import ApplicationCard from "../../../components/Application/ApplicationCard/ApplicationCard";
import { getAdminRole } from "../../../store/user/user.slice";

const CheckTz = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { item, itemError } = useSelector((state) => state.viewTz);
  const loading = useSelector((state) => state.viewTz.loading);
  const { isAdmin } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCard(params.itemId));
    dispatch(getTechnology(params.itemId));
    dispatch(getOther(params.itemId));
    dispatch(getRequirements(params.itemId));
    dispatch(getFiles(params.itemId));
    dispatch(getCustomer(params.itemId));
    dispatch(getPaylink(params.itemId));
    dispatch(getAdminRole());
  }, [dispatch, params.itemId]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(getSource(params.itemId));
    }
  }, [dispatch, isAdmin, params.itemId]);

  useEffect(() => {
    if (!itemError) return;
    navigate("/not-found");
  }, [itemError, navigate]);

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
