import { useSelector } from "react-redux";
import styles from './FinishMessage.module.scss'
import { Link } from "react-router-dom";

const FinishMessage = () => {
  const stage = useSelector((state) => state.form.currentStage);
  const isEditMode = useSelector((state) => state.form.isEditMode);
  const isHide = stage != 6
  if (isHide) return ''
   
   return (
      <div className={styles['message__wrapper']}>
         <div className={styles['message__text']}>{isEditMode ? 'Заявка отредактирована!' : 'Заявка отправлена!'}</div>
         <button className={styles['message__btn']}><Link to={'/profile/order/all'}>Перейти к созданным заявкам</Link></button>
      </div>
   )
}
export default FinishMessage