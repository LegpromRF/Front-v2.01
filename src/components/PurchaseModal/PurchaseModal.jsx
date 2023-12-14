import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import PurchaseModalContent from './PurchaseModalContent';

//использую обертку для обработки сценария с неавторизованным пользователем или иным запретом доступа к покупке
const PurchaseModal = ({ isOpen, close }) => {
   const [isOpenAccess, setOpenAccess] = useState(true) 
   const navigate = useNavigate()
   
   useEffect(() => {
      if (!isOpen || isOpenAccess) return
      fetch(apiHOST+'lk/welcome').then(res => {
         const SERVER_DENIED = !res.ok
         if (SERVER_DENIED) {
            navigate('/auth')
            close()
         } else {
            setOpenAccess(true)
         }
      })
   }, [isOpen, isOpenAccess])
   
   return (isOpenAccess && isOpen) ? <PurchaseModalContent close={close} /> : ''
}

export default PurchaseModal