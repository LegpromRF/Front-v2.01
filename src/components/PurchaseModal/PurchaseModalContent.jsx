import { useState, useCallback, useRef, useEffect } from 'react'
import ImgClose from '../../../public/icon/close.svg'
import { downloadPDFWithINN, purchaseTypes } from './constants'
import PurchaseType from './stages/PurchaseType'
import PurchaseInit from './stages/PurchaseInit'
import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import axios from "axios"

import styles from './PurchaseModal.module.scss'

const modalPurchaseContainerID = 'modalPurchaseContainerID'

const titlesByStage = {
   typePurchase: 'Выберете способ оплаты',
   [purchaseTypes.ACCOUNT]: 'Введите ваш ИНН'
}

const stagesCount = 2 //две стадии оплаты

const PurchaseModalContent = ({ close }) => {
   const [purchaseType, setPurchaseType] = useState(purchaseTypes.ACCOUNT)
   const [currentStage, setCurrentStage] = useState(1)
   
   const inputINNRef = useRef(null)
   
   const handleRadioChange = (event) => {
      const id = event.target.id
      if (id == purchaseTypes.ACCOUNT) setPurchaseType(purchaseTypes.ACCOUNT)
      if (id == purchaseTypes.CARD) setPurchaseType(purchaseTypes.CARD)
   }
   
   const handlePurchase = useCallback(() => {
      try {
         const inn = inputINNRef.current?.value ?? ''
         if (purchaseType == purchaseTypes.ACCOUNT && inn) {
            axios.get(apiHOST+'subscriptions/pay_by_invoice/?inn='+inn, {
               withCredentials: true,
               responseType: 'arraybuffer'
               // type
            }).then(async (res) => {
               console.log(res);
               if (res.status === 200) {
                  downloadPDFWithINN(inn, res.data) //async
               }
            })
         }
         if (purchaseType == purchaseTypes.CARD) {
            axios.get(apiHOST+'subscriptions/pay_by_card/', {
               withCredentials: true
            }).then(async (res) => {
               if (res.status === 200) {
                  const paymentUrl = res.data.payment_link
                  window.location.replace(paymentUrl)
               }
            })  
         }
      } catch(e) {
         console.error(e)
      }
      close()
   }, [purchaseType])
   
   const handleNextStage = useCallback(() => {
      if ((currentStage == 1 && purchaseType == purchaseTypes.CARD) || currentStage == stagesCount) handlePurchase()
      setCurrentStage(stage => stage < stagesCount ? stage + 1 : stage)
   }, [purchaseType, currentStage])

   const handlePrevStage = () => setCurrentStage(stage => stage > 1 ? stage - 1 : stage)
   

   useEffect(() => {
      const clickHandler = (event) => event.target.id == modalPurchaseContainerID ? close() : null
      const keyHandler = (event) => event.code == 'Escape' ? close() : null
      
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
      return () => {
         document.removeEventListener('click', clickHandler)
         document.removeEventListener('keydown', keyHandler)
      }
   }, [])

   return (
      <div className={styles.container} id={modalPurchaseContainerID}>
         <div className={styles.modal}>
            <div className={styles.modal__header}>
               <h2 className={styles.modal__title}>
                  {currentStage == 1 ? titlesByStage.typePurchase : ''}
                  {currentStage == 2 ? titlesByStage[purchaseType] : ''}
               </h2>
               <button onClick={close}><img src={ImgClose} alt="close" /></button>
            </div>
            {currentStage == 1 ? <PurchaseType type={purchaseType} handleChange={handleRadioChange} />: ''}
            {currentStage == 2 ? <PurchaseInit type={purchaseType} inputINNRef={inputINNRef} />: ''}
            <div className={styles.modal__footer}>
               {currentStage == 1 ? '' : <button onClick={handlePrevStage}>Назад</button>}
               <button className={styles['modal__btn-next']} onClick={handleNextStage}>{currentStage == stagesCount ? 'Отправить' : 'Продолжить'}</button>
            </div>
         </div>
      </div>
   )
}

export default PurchaseModalContent