import Layout from "@layout/Layout";
import Header from "./Header/Header";
import Product from "./stages/Product/Product";
import Purchase from "./stages/Purchase/Purchase";
import Technology from "./stages/Technology/Technology";
import Conditions from "./stages/Conditions/Conditions";
import Contacts from "./stages/Contacts/Contacts";
import { useDispatch, useSelector } from "react-redux";
import { setNextStage, setPrevStage } from "@store/orders/form.slice";
import { useCallback, useEffect, useRef } from "react";
import {
  clearData,
  getStageNumberByStageFields,
  loadFormForEdit,
  setCurrentStage,
  setEditModeData,
  submitForm,
  updateFormData,
} from "../../store/orders/form.slice";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { requiredFields } from "@store/orders/utils";

import styles from "./CreateOrder.module.scss";

const CreateOrder = ({ editMode, orderId }) => {
  
  const {
    currentStage: stage,
    editModeData: { isFormLoading },
    formData,
    stageFields,
    isEditMode
  } = useSelector((state) => state.form);
  const { isAdmin } = useSelector((state) => state.admindata);
  // console.log(formData, isFormLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //функции для имитации отправки формы
  const productSubmitRef = useRef(null);
  const purchaseSubmitRef = useRef(null);
  const technologySubmitRef = useRef(null);
  const conditionsSubmitRef = useRef(null);
  const contactsSubmitRef = useRef(null);

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

  // useEffect(() => {
  //   dispatch(clearData());
  // }, [window.location.href]);
  useEffect(() => {
    if (stage == 6 || editMode) dispatch(clearData());
  }, [editMode]);
    //не добавлять stage, т.к clearData отправляется только в случае если пользователь ушел со страницы создания формы и вернулся

  const formSubmitting = useCallback(() => {
    for (const field of requiredFields) {
      console.log(formData);
      if (!formData[field]) {
        const number = getStageNumberByStageFields(stageFields, field);
        if (!number) navigate('/404')

        //перебрасываю пользователя на ту стадию, на котрой находится первое незаполненное обязательное поле
        dispatch(setCurrentStage(number));

        //подсвечиваю все такие поля с помощью имитации отправки формы
        if (number == 1) productSubmitRef.current();
        if (number == 2) purchaseSubmitRef.current();
        if (number == 3) technologySubmitRef.current();
        if (number == 4) conditionsSubmitRef.current();
        if (number == 5) contactsSubmitRef.current();

        return;
      }
    }
    
    if (!isAdmin) dispatch(updateFormData({ status: 2 })); // изменить статус на "На модерации"
    dispatch(submitForm());
  }, [isAdmin, stageFields, formData])
  
  
  
  return (
    <Layout>
      <div className={styles.createOrder}>
        <h1 className={styles["createOrder__title"]}>
          {editMode
            ? "Техническое задание: редактирование"
            : "Техническое задание"}
        </h1>
        {isFormLoading ? (
          <div className={styles.createOrder__loader}>
            <span>Загрузка формы...</span>
            <CircularProgress size={50} />
          </div>
        ) : (
          <>
            <Header />
            <div className={styles.createOrder__order}>
              <div className={styles.createOrder__content}>
                <div className={styles.createOrder__body}>
                  <Product
                    handleNextStage={handleNextStage}
                    formSubmitRef={productSubmitRef}
                  />
                  <Purchase
                    handlePrevStage={handlePrevStage}
                    handleNextStage={handleNextStage}
                    formSubmitRef={purchaseSubmitRef}
                  />
                  <Technology
                    handlePrevStage={handlePrevStage}
                    handleNextStage={handleNextStage}
                    formSubmitRef={technologySubmitRef}
                  />
                  <Conditions
                    handlePrevStage={handlePrevStage}
                    handleNextStage={handleNextStage}
                    formSubmitRef={conditionsSubmitRef}
                  />
                  <Contacts
                    handlePrevStage={handlePrevStage}
                    handleNextStage={handleNextStage}
                    formSubmitRef={contactsSubmitRef}
                    totalFormSubmitting={formSubmitting}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
export default CreateOrder;
