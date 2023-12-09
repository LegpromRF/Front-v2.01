import Cookies from "js-cookie";
import { apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

const API_VERSION = "5.207";

export default async function vkAPI(data, authMode) {
  let redirectURI;
  let params;

  const authModes = {
    login: {
      redirectURI: apiEndpoints.vkLogin,
      params: {
        api_version: API_VERSION,
        silent_token: data.payload.token,
        uuid: data.payload.uuid,
      },
    },
    register: {
      redirectURI: apiEndpoints.vkReg,
      params: {
        api_version: API_VERSION,
        silent_token: data.silentToken,
        uuid: data.uuid,
      },
    },
  };

  switch (authMode) {
    case "login":
      redirectURI = authModes.login.redirectURI;
      params = authModes.login.params;
      break;
    case "register":
      redirectURI = authModes.register.redirectURI;
      params = authModes.register.params;
      break;
  }

  try {
    const response = await axios.post(redirectURI, params, {
      withCredentials: true,
      AccessControlAllowOrigin: true,
    });

    console.log(response);

    if (response.data.status === 204) {
      const JWTcookie = Cookies.get("legpromauth");
      // const cookiesArray = Object.entries(cookies);
      console.log(JWTcookie);
      let JWTtoken = null;
      if (JWTcookie) {
        JWTtoken = JWTcookie.trim();
        return JWTtoken;
      } else {
        // Обработка ошибки: отсутствие куки
        throw new Error("JWT cookie not found");
      }
    } else {
      return response.data.details;
    }
  } catch (error) {
    console.log(error);
  }
}
