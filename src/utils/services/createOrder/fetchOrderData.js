import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";

export async function fetchProduct() {
    axios.get(apiEndpoints.product, {
        withCredentials: true,
    })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}
