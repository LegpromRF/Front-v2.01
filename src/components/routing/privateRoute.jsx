import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
    const cookies = document.cookie
    const cookiesArray = cookies.split(';')
    let JWTtoken = null
    const JWTcookie = cookiesArray.find(cookie => cookie.trim().startsWith('legpromauth'))
    if (JWTcookie) {
        JWTtoken = JWTcookie.split('=')[1].trim();
    }

    return JWTtoken !== null ? children : <Navigate to={"/"}/>
}

PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute