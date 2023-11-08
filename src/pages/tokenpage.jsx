
import {Navigate, useLocation} from "react-router-dom";
import {useEffect} from "react";

function FunctionTokenPage() {
   let location = useLocation()

    useEffect(() => {
        console.log(location.search)

    }, [location]);

    return (
        <>
        </>
    )
}

export default FunctionTokenPage