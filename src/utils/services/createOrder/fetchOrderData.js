import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";

export async function fetchProduct() {
    axios.get(apiEndpoints.products)
        .then((response) => {
            console.log(response)
        })
}
