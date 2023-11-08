import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return isAuthenticated ? children : <Navigate to={"/"}/>
}

PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute