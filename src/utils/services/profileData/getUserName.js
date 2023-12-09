import axios from "axios";
import { apiHOST } from "@/utils/constants/apiEndpoints.js";

export default async function getUserName() {
  return axios
    .get(`${apiHOST}lk/welcome`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.status === 200) {
        return response.data.data;
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));
}
