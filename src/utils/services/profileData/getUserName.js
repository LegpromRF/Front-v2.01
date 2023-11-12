import axios from "axios";
import {apiHOST} from "@/utils/constants/apiEndpoints.js";

export default async function getUserName() {
    axios
        .get(`${apiHOST}lk/welcome`, {
            withCredentials: true
        })
        .then((response) => {
            console.log(response)
            return response.data
        })
        .catch((error) => console.log(error))
}