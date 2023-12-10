import axios from "axios";
import Cookies from "js-cookie";
import { apiEndpoints } from "@/utils/constants/apiEndpoints.js";

export default async function handleLogin(data, authMethod) {
  const apiURL = apiEndpoints.login;
  let login = "";
  if (authMethod === "sms") {
    login = data.phone.replace(/\D/g, "");
  } else {
    login = data.email;
  }

  const params = {
    login: login,
    kind: authMethod,
    password: data.password,
  };

  return axios
    .post(apiURL, params, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.status === 204) {
        Cookies.set("uuid_user", `${response.data.data ? "auth" : ""}`, {
          expires: 10000,
        });
        return true;
      } else {
        return response.data.details;
      }
    });
}
