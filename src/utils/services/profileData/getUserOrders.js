import axios from "axios";
import { apiHOST } from "@/utils/constants/apiEndpoints.js";

export default async function getUserOrders() {
  return axios
    .get(`${apiHOST}orders/`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));
}
