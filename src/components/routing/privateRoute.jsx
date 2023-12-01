import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

function PrivateRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    return isAuthenticated ? children : <Navigate to="/" replace={true}/>
}

PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute 