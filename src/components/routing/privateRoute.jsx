import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

function PrivateRoute({ children, page }) {
  const auth = Cookies.get("uuid_user");
  return auth ? children : <Navigate to={`/${page}`} replace={true} />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
  page: PropTypes.string,
};
export default PrivateRoute;
