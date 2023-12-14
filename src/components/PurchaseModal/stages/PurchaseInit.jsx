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

   const redirectToPayment = async (event) => {
      event.preventDefault()
      
      try {
         const res = await fetch(apiHOST+'subscriptions/create')
         if (res.ok) {
            const paymentUrl = await res.json()
            window.location.replace(paymentUrl)
         }
      } catch(e) {
         console.error(e)
      }
   }
   
   return (
      <div className={styles.modal__body}>
         {type == purchaseTypes.ACCOUNT ? <input type="number" onChange={handleChangeINN} placeholder="ИНН" ref={inputINNRef}/> : ''}
         {type == purchaseTypes.CARD ? <a href="#" onClick={redirectToPayment}>Перейти на ЮMONEY</a> : ''}
      </div>
   )
}


export default PurchaseInit