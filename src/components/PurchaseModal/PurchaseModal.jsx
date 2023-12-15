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
      const handleServerReject = () => {
         navigate('/auth')
         close()
      }
      
      axios.get(`${apiHOST}lk/welcome`, { withCredentials: true }).then(res => {
         const isServerAccess = res.data.status === 200
         if (isServerAccess) setOpenAccess(true) 
         else handleServerReject()
      }).catch(() => handleServerReject())
   }, [isOpen, isOpenAccess])
   
   return (isOpenAccess && isOpen) ? <PurchaseModalContent close={close} /> : ''
}

export default PurchaseModal