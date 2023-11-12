import axios from "axios";
import {apiHOST} from "@/utils/constants/apiEndpoints.js";

export default async function getUserName() {
    axios
        .get(`${apiHOST}lk/welcome`, {
            withCredentials: true
        })
        .then((response) => {
            if (response.data.status === 200) {
                console.log(response)
                return response.data.data
            } else return false

        })
        .catch((error) => console.log(error))
}