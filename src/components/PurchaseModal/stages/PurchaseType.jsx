import { purchaseTypes } from '../constants'
import styles from '../PurchaseModal.module.scss'

const PurchaseType = ({ type, handleChange }) => {
  const handleLabelClick = (event) => {
    if (event.code == 'Enter') { //перехватываю нажатие Enter по выделенному label
      const inputChild = event.target.querySelector("#" + purchaseTypes.CARD) || event.target.querySelector("#" + purchaseTypes.ACCOUNT)
      if (inputChild) inputChild.click() 
    }
    
  }
  
   return (
    <div className={styles.modal__body}>
      <label className={styles['modal__label-radio']} tabIndex={0} onKeyDown={handleLabelClick}>
        <input checked={type == purchaseTypes.ACCOUNT} onChange={handleChange} tabIndex={-1} id={purchaseTypes.ACCOUNT} type="radio" name="purchase" />
        Через счёт
      </label>
      <label className={styles['modal__label-radio']} tabIndex={0} onKeyDown={handleLabelClick}>
        <input checked={type == purchaseTypes.CARD} onChange={handleChange} id={purchaseTypes.CARD} tabIndex={-1} type="radio" name="purchase" />
        Через карту
      </label>
    </div>
   )
}
export default PurchaseType