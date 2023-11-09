import axios from "axios";
import {apiHOST} from "@/utils/constants/apiEndpoints.js";

export default function getUserName() {
    axios.get(`${apiHOST}lk/welcome`)
        .then((response) => {
            console.log(response)
            return response.data
        })
        .catch((error) => console.log(error))
}