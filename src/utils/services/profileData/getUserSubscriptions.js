import axios from "axios";
import { apiHOST } from "@/utils/constants/apiEndpoints.js";

export default async function getUserSubscriptions() {
  return axios
    .get(`${apiHOST}subscriptions/all/`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.subscriptions;
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));
}
