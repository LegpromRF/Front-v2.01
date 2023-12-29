import Layout from "@layout/Layout";
import OrdersTable from "@components/Subscriprions/Tables/OrdersTable/OrdersTable";
import SubsTable from "@components/Subscriprions/Tables/SubsTable";
import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import AdminSearchArea from "../../../components/Subscriprions/AdminSearchArea/AdminSearchArea";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setUserOrders } from "@store/session/userdata.slice";
import { setAdmin } from "../../../store/session/admindata.slice";
import getUserOrders from "../../../utils/services/profileData/getUserOrders";

const Subscriptions = ({ forAdmin }) => {
  // const isAdmin = useSelector((state) => state.admindata.isAdmin);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isAdmin = true

  useEffect(() => {
    if (forAdmin && (isAdmin === false)) navigate("/profile/subscriptions")
  }, [forAdmin, isAdmin])

  useEffect(() => {
    getUserOrders().then((data) => dispatch(setUserOrders(data)));
  }, []);
  

  return (
    <Layout>
      {forAdmin && isAdmin ? (
        <>
          <AdminSearchArea />
          <OrdersTable forAdmin={forAdmin} />
        </>
      ) : (
        <>
          <SubsTable />
          <OrdersTable />
        </>
      )}
    </Layout>
  );
};
export default Subscriptions;
