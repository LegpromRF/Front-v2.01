import { apiEndpoints } from "@/utils/constants/apiEndpoints.js";
import axios from "axios";

export default async function handleVerification(authMethod, data) {
  let login = "";
  if (authMethod === "sms") {
    login = data.phone.replace(/\D/g, "");
  } else {
    login = data.email;
  }
  const apiURL = apiEndpoints.verification;
  const params = {
    login: login,
    kind: authMethod,
  };

  try {
    const response = await axios.get(apiURL, { params });
    return await response.data;
  } catch (error) {
    console.log(error.response?.data?.detail);
    return { status: 'error', details: error.response?.data?.detail}
  }
}
