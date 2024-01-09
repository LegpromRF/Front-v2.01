import axios from "axios";
import { apiEndpoints } from "../../constants/apiEndpoints";

export const fetchForm = async (form) => {
  try {
    const res = await axios.post(apiEndpoints.bidCreate, form, { withCredentials: true })
    console.log('res', res);
    if (res.status == 201) {
      const id = res.data.bid_id
      form.id = id
      const resOther = await axios.post(apiEndpoints.bidOther, form, { withCredentials: true })
      console.log('resOther: ', resOther);
      const resRequirements = await axios.post(apiEndpoints.bidRequirements, form, { withCredentials: true })
      console.log('resRequirements: ', resRequirements);
      const resTechnology = await axios.post(apiEndpoints.bidTechnology, form, { withCredentials: true })
      console.log('resTechnology: ', resTechnology);
    }
    return { ok: true }
  } catch (e) {
    console.error(e);
    return { ok: false }
  }
}

export const fetchEditForm = async (form) => {
  try {
    const res = await axios.post(apiEndpoints.bidEditCreate, form, { withCredentials: true, AccessControlAllowOrigin: true, })
    // console.log('res', res);
    if (res.status == 201) {
      const resOther = await axios.post(apiEndpoints.bidEditOther, form, { withCredentials: true })
      // console.log('resOther: ', resOther);
      const resRequirements = await axios.post(apiEndpoints.bidEditRequirements, form, { withCredentials: true })
      // console.log('resRequirements: ', resRequirements);
      const resTechnology = await axios.post(apiEndpoints.bidEditTechnology, form, { withCredentials: true })
      // console.log('resTechnology: ', resTechnology);
    }
    return { ok: true }
  } catch (e) {
    console.error(e);
    return { ok: false }
  }
}