
import {Navigate, useLocation} from "react-router-dom";
import {useEffect} from "react";

function FunctionTokenPage() {
   let location = useLocation()

    useEffect(() => {
        console.log(location.pathname)

    }, [location]);

    return <Navigate to={'/profile/home'}/>
}

export default FunctionTokenPage