import { useState, useCallback, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import ImgClose from '../../../public/icon/close.svg'
import { downloadPDFWithINN, purchaseTypes } from './constants'
import PurchaseType from './stages/PurchaseType'
import PurchaseInit from './stages/PurchaseInit'
import { apiHOST } from "@/utils/constants/apiEndpoints.js";

import styles from './PurchaseModal.module.scss'

const modalPurchaseContainerID = 'modalPurchaseContainerID'

const titlesByStage = {
   typePurchase: 'Выберете способ оплаты',
   [purchaseTypes.ACCOUNT]: 'Введите ваш ИНН',
   [purchaseTypes.CARD]: 'Введите данные вашей карты'
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
      if (purchaseType == purchaseTypes.ACCOUNT) {
         const inn = inputINNRef.current?.value ?? ''
         if (inn) downloadPDFWithINN(inn) //async
      }
      close()
   }, [purchaseType])
   
   const handleNextStage = () => setCurrentStage(stage => {
      if (stage == stagesCount) handlePurchase()
      return stage < stagesCount ? stage + 1 : stage
   })

   const handlePrevStage = () => setCurrentStage(stage => stage > 1 ? stage - 1 : stage)
   

   useEffect(() => {
      const clickHandler = (event) => event.target.id == modalPurchaseContainerID ? close() : null
      const keyHandler = (event) => event.code == 'Escape' ? close() : null
      
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
      return () => {
         window.removeEventListener('click', clickHandler)
         window.removeEventListener('keydown', keyHandler)
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
               <button onClick={handlePrevStage} disabled={currentStage == 1}>Назад</button>
               {currentStage == 2 && purchaseType == purchaseTypes.CARD ? '' : 
               <button className={styles['modal__btn-next']} onClick={handleNextStage}>{currentStage == stagesCount ? 'Отправить' : 'Продолжить'}</button>}
            </div>
         </div>
      </div>
   )
}

export default PurchaseModalContent