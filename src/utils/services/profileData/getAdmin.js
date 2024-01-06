import axios from "axios";
import { apiHOST } from "@/utils/constants/apiEndpoints.js";

export default async function getAdmin() {
  return axios
    .get(`${apiHOST}auth/admin`, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        return Boolean(response.data.is_admin);
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));
}
