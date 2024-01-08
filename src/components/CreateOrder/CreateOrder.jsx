import Layout from "@layout/Layout";
import Header from "./Header/Header";
import Product from "./stages/Product/Product";
import Purchase from "./stages/Purchase/Purchase";
import Technology from "./stages/Technology/Technology";
import Conditions from "./stages/Conditions/Conditions";
import Contacts from "./stages/Contacts/Contacts";
import FinishMessage from "./stages/FinishMessage/FinishMessage";
import { useDispatch, useSelector } from "react-redux";
import { setNextStage, setPrevStage } from "@store/orders/form.slice";

import styles from "./CreateOrder.module.scss";
import { useEffect } from "react";
import {
  clearData,
  loadFormForEdit,
  setEditModeData,
} from "../../store/orders/form.slice";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateOrder = ({ editMode, orderId }) => {
  const isFormLoading = useSelector(
    (store) => store.form.editModeData.isFormLoading
  );
  const stage = useSelector((state) => state.form.currentStage);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleNextStage = () => {
    dispatch(setNextStage());
  };

  const handlePrevStage = () => {
    dispatch(setPrevStage());
  };

  useEffect(() => {
    dispatch(setEditModeData({ orderId, isEditMode: Boolean(editMode) }));
    if (editMode) dispatch(loadFormForEdit(orderId));
  }, [editMode, orderId]);

  useEffect(() => {
    dispatch(clearData())
    // if (stage == 6) {
    //   setTimeout(() => {
    //     navigate('/profile/order/all')
    //     dispatch(clearData())
    //   }, [5000])
    // }
  }, [])
  // }, [stage])

  return (
    <Layout>
      <div className={styles.createOrder}>
        <h1 className={styles["createOrder__title"]}>{editMode ? 'Техническое задание: редактирование' : 'Техническое задание'}</h1>
        {isFormLoading ? 
           <div className={styles.createOrder__loader}>
            <span>Загрузка формы...</span>
            <CircularProgress size={50} />
           </div> :
          <>
            <Header />
            <div className={styles.createOrder__order}>
              <div className={styles.createOrder__content}>
                <div className={styles.createOrder__body}>
                  <Product handleNextStage={handleNextStage} />
                  <Purchase
                    handlePrevStage={handlePrevStage}
                    handleNextStage={handleNextStage}
                  />
                  <Technology
                    handlePrevStage={handlePrevStage}
                    handleNextStage={handleNextStage}
                  />
                  <Conditions
                    handlePrevStage={handlePrevStage}
                    handleNextStage={handleNextStage}
                  />
                  <Contacts
                    handlePrevStage={handlePrevStage}
                    handleNextStage={handleNextStage}
                  />
                  <FinishMessage />
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </Layout>
  );
};
export default CreateOrder;
