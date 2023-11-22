import axios from "axios";
import {apiEndpoints} from "@/utils/constants/apiEndpoints.js";

async function fetchData(endpoint) {
    return axios.get(apiEndpoints[endpoint], {
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

export default async function getPropObject(endpoint) {
    try {
        const props = await fetchData(endpoint)
        console.log(props)
        return props
    } catch (error) {
        console.log(error)
    }

}