import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../../store/auth/auth.slice";
import img from "../../../../public/Auth/logout.svg";
import styles from "./ButtonLogout.module.scss";

function ButtonLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = Cookies.get("uuid_user");
  const handleClick = () => {
    Cookies.set("uuid_user", "", { expires: 10000 });
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <>
      {auth && (
        <button className={styles.footer__control_logout} onClick={handleClick}>
          <img src={img} />
        </button>
      )}
    </>
  );
}

export default ButtonLogout;
