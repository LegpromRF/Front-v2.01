
import {Navigate, useLocation} from "react-router-dom";
import {useEffect} from "react";

function TokenPage() {
   let location = useLocation()

    useEffect(() => {
        console.log(location.pathname)

    }, [location]);

    return <Navigate to={'/profile'}/>
}

export default TokenPage