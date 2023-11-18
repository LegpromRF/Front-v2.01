import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";

async function fetchProduct() {
    return axios.get(apiEndpoints.product, {
        withCredentials: true,
    })
        .then((response) => {
            console.log(response)
            return response.data.data
        })
        .catch((error) => {
            console.log(error)
        })
}

export default async function getPropObject() {
    try {
        const props = await fetchProduct()
        console.log(props)
        return props
    } catch (error) {
        console.log(error)
    }

}