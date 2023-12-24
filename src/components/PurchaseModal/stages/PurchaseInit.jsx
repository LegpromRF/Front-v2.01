import { useRef, useState } from "react"
import { purchaseTypes } from '../constants'
import styles from '../PurchaseModal.module.scss'
import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import { useNavigate } from "react-router-dom";

const PurchaseInit = ({ type, inputINNRef }) => {
   
   const handleChangeINN = (event) => {
      let value = event.target.value
      const INNmaxLength = 12
      if (value.length > INNmaxLength) event.target.value = value.slice(0, INNmaxLength)
   }

   
   return (
      <div className={styles.modal__body}>
         {type == purchaseTypes.ACCOUNT ? <input type="number" onChange={handleChangeINN} placeholder="ИНН" ref={inputINNRef}/> : ''}
      </div>
   )
}


export default PurchaseInit