import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import PurchaseModalContent from './PurchaseModalContent';
import Cookies from "js-cookie";

//использую обертку для обработки сценария с неавторизованным пользователем или иным запретом доступа к покупке
const PurchaseModal = ({ isOpen, close }) => {
   const [isOpenAccess, setOpenAccess] = useState(false)
   const navigate = useNavigate()
   useEffect(() => {
      const auth = Cookies.get("uuid_user")
      if (isOpen && !auth) {
         navigate('/auth?fromHomePurchase=true')
         close()
      } else if (auth && !isOpenAccess) {
         setOpenAccess(true)
      }
   }, [isOpen, isOpenAccess])
   
   return (isOpen && isOpenAccess) ? <PurchaseModalContent close={close} /> : ''
}

export default PurchaseModal