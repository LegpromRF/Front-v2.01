import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { convertInputDateToIso, transformDataToServer } from "./services";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";

export const stagesCount = 6

export const formSlice = createSlice({
  name: "form",
  initialState: {
    currentStage: 1,
    availableStages: 6, // стадии, на которые можно перейти (чтобы пользователь переходил только на прошлые, уже заполненные стадии) 
    formData: {},
    mediateData: {
      doc_urls: null,
      photo_urls: null
    } //поля, которые помогают возвращать загруженные фото и файлы в форму, если пользователь ушел со страницы и вернулся 
  },
  reducers: {
    setCurrentStage: (state, action) => {
        let newStage = action.payload;
        if (newStage >= stagesCount) newStage =  stagesCount;
        else if (newStage <= 1) newStage =  1;
        if (newStage > state.availableStages) state.availableStages = newStage
        
        state.currentStage = newStage;
    },
    setNextStage: (state) => {
        let newStage = state.currentStage + 1;
        if (newStage >= stagesCount) newStage = stagesCount;
        if (newStage > state.availableStages) state.availableStages = newStage
        
        state.currentStage = newStage;
    },
    setPrevStage: (state) => {
        let newStage = state.currentStage - 1;
        if (newStage <= 1) newStage =  1;
        if (newStage > state.availableStages) state.availableStages = newStage
        
        else state.currentStage = newStage;
    },
    updateAndSubmitFormData: async (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      console.log(state.formData);
      const formDataToSubmit = {...state.formData}

      formDataToSubmit.deadline = convertInputDateToIso(formDataToSubmit.deadline)
      formDataToSubmit.start_date = convertInputDateToIso(formDataToSubmit.start_date)
      
      transformDataToServer(formDataToSubmit) // mutate formDataToSubmit
      console.log('submit', formDataToSubmit);
      // const test = {
      // "gender_and_age": [1],
      // "price_segment": [1],
      // "photo_urls": ["string"],
      // "order_name": "string",
      // "status": 1,
      // "product_type": 144,
      // "clothes_type": 33,
      // "purpose": 22,
      // "clothes_name": 1,
      // "season": 1,
      // "count": 1,
      // "price_per_unit": 1.1,
      // "price_for_all": 1.5,
      // "deadline": "2124-11-15T11:31:44.172Z",
      // "location": 1,
      // "supplier_region": {},
      // "regularity_of_order": 1,
      // "customer_name": "string",
      // "customer_phone": "string",
      // "customer_email": "string",
      // "customer_tg": "string"
      // }
      
      try {
        const res = await axios.post(apiEndpoints.bidCreate, formDataToSubmit, { withCredentials: true })
        if (res.status == 201) {
          const id = res.data.bid_id
          formDataToSubmit.id = id
          const resOther = await axios.post(apiEndpoints.bidOther, formDataToSubmit, { withCredentials: true })
          console.log('resOther: ', resOther);
          const resRequirements = await axios.post(apiEndpoints.bidRequirements, formDataToSubmit, { withCredentials: true })
          console.log('resRequirements: ', resRequirements);
          const resTechnology = await axios.post(apiEndpoints.bidTechnology, formDataToSubmit, { withCredentials: true })
          console.log('resTechnology: ', resTechnology);
        }
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      console.log(state.formData);
    },
    updateMediateData: (state, action) => {
      state.mediateData = { ...state.mediateData, ...action.payload }
    }

  },
});

export const getFormField = (name) => useSelector(state => state?.form?.formData?.[name])
export const getMediateData = (name) => useSelector(state => state?.form?.mediateData?.[name])

export const {
  updateAndSubmitFormData,
  updateFormData,
  updateMediateData,
  setCurrentStage,
  setNextStage,
  setPrevStage
} = formSlice.actions;

export default formSlice.reducer;