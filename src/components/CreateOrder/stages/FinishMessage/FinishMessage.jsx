import { useSelector } from "react-redux";
import styles from './FinishMessage.module.scss'

const FinishMessage = () => {
  const stage = useSelector((state) => state.form.currentStage);
  const isEditMode = useSelector((state) => state.form.isEditMode);
  const isHide = stage != 6
   
   return (
      isHide ? null : <div className={styles.message}>{isEditMode ? 'Форма отредактирована!' : 'Форма отправлена!'}</div>
   )
}
export default FinishMessage