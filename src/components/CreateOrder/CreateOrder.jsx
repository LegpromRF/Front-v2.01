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
import { loadFormForEdit, setEditModeData } from "../../store/orders/form.slice";

const CreateOrder = ({ editMode, orderId }) => {
  const dispatch = useDispatch();

  const handleNextStage = () => {
    dispatch(setNextStage());
  };

  const handlePrevStage = () => {
    dispatch(setPrevStage());
  };

  useEffect(() => {
    dispatch(setEditModeData({ orderId, isEditMode: editMode }));
    dispatch(loadFormForEdit(orderId))
  }, [editMode, orderId]);

  console.log(useSelector((state) => state.form));

  return (
    <Layout>
      <div className={styles.createOrder}>
        <h1 className={styles["createOrder__title"]}>Техническое задание</h1>
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
      </div>
    </Layout>
  );
};
export default CreateOrder;
