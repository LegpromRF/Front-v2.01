import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import PurchaseModalContent from './PurchaseModalContent';
import axios from "axios";

//использую обертку для обработки сценария с неавторизованным пользователем или иным запретом доступа к покупке
const PurchaseModal = ({ isOpen, close }) => {
   const [isOpenAccess, setOpenAccess] = useState(false) 
   const navigate = useNavigate()
   
   useEffect(() => {
      if (!isOpen || isOpenAccess) return

      try {
         axios.get(`${apiHOST}lk/welcome`, {
            withCredentials: true,
         }).then(res => {
            const serverDenied = !res.ok
            if (serverDenied) {
               navigate('/auth')
               close()
            } else {
               setOpenAccess(true)
            }
         })
      } catch(e) {
         console.error(e)
      }
   }, [isOpen, isOpenAccess])
   
   return (isOpenAccess && isOpen) ? <PurchaseModalContent close={close} /> : ''
}

export default PurchaseModal