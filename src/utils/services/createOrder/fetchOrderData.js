import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";

async function fetchProduct() {
    return axios.get(apiEndpoints.product, {
        withCredentials: true,
    })
        .then((response) => {
            console.log(response)
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })
}

export default async function getPropObject(index) {
    const prop = await fetchProduct()
    return prop.get(index)
}