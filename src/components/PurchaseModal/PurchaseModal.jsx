import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiHOST } from "@/utils/constants/apiEndpoints.js";
import { handleRedirect } from "@store/auth/authModal.slice.js";
import PurchaseModalContent from "./PurchaseModalContent";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

//использую обертку для обработки сценария с неавторизованным пользователем или иным запретом доступа к покупке
const PurchaseModal = ({ isOpen, close }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenAccess, setOpenAccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = Cookies.get("uuid_user");
    if (isOpen && !auth) {
      dispatch(handleRedirect("/?purchase=true"));
      navigate("/auth");
      close();
    } else if (auth && !isOpenAccess) {
      setOpenAccess(true);
    }
  }, [isOpen, isOpenAccess]);

  return isOpen && isOpenAccess ? <PurchaseModalContent close={close} /> : "";
};

export default PurchaseModal;
