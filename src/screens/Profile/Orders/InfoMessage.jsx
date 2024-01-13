import { useCallback, useEffect, useState } from 'react';
import styles from './Orders.module.scss'
import { useSelector } from 'react-redux';

const message = {
  create: {
    error: "К сожалению сейчас не вышло создать вашу заявку. Попробуйте позже",
    success: "Ваша заявка создана!",
  },
  edit: {
    error:
      "К сожалению сейчас не вышло отредактировать заявку. Попробуйте позже",
    success: "Заявка отредактирована!",
  },
};

const InfoMessage = () => {
  const { isFormFetchingSuccess, isEditMode } = useSelector(
    (state) => state.form
  );
  
  const [infoMess, setInfoMess] = useState(null); 

  const handleInfoMess = useCallback((isSuccess) => {
    if (isEditMode) {
      if (isSuccess) setInfoMess(message.edit.success)
      else setInfoMess(message.edit.error)
    } else {
      if (isSuccess) setInfoMess(message.create.success)
      else setInfoMess(message.create.error)
    }
  }, [isEditMode])

  useEffect(() => {
    if (isFormFetchingSuccess === true || isFormFetchingSuccess === false) {
      handleInfoMess(isFormFetchingSuccess);
      setTimeout(() => {
        setInfoMess(null);
      }, 5000);
    }
  }, [isFormFetchingSuccess]);
  
  if (!infoMess) return ''
  
   return (
    <div
    className={`${styles["orders__info-mess"]} ${styles[`orders__info-mess_${infoMess == message.create.error || infoMess == message.edit.error ? 'success' : 'error'}`]}`}
  >
    <p>{infoMess}</p>
  </div>
   )
}
export default InfoMessage