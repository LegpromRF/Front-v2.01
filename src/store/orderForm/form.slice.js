import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { convertInputDateToIso, transformDataToServer } from "./utils";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";

export const stagesCount = 6

export const formSlice = createSlice({
  name: "form",
  initialState: {
    currentStage: 1,
    isEditMode: false,
    editModeData: {
      orderId: null
    },
    formData: {},
    mediateData: {
      doc_urls: null,
      photo_urls: null
    } //поля, которые помогают возвращать загруженные фото и файлы в форму, если пользователь ушел со страницы и вернулся 
  },
  reducers: {
    setCurrentStage: (state, action) => {
      let newStage = action.payload;
      // if (newStage > state.currentStage) return  //todo

      if (newStage >= stagesCount) newStage =  stagesCount;
      else if (newStage <= 1) newStage =  1;
      
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
      let formDataToSubmit = {...state.formData}

      if (formDataToSubmit.deadline) formDataToSubmit.deadline = convertInputDateToIso(formDataToSubmit.deadline)
      if (formDataToSubmit.start_date) formDataToSubmit.start_date = convertInputDateToIso(formDataToSubmit.start_date)
      
      
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
      // formDataToSubmit = {
      //   "clothes_name": 1,
      //   "clothes_type": 1,
      //   "comment": undefined,
      //   "count": "2",
      //   "customer_email": "sajs@sajas",
      //   "customer_name": "asdka",
      //   "customer_phone": "21812",
      //   "customer_tg": "12331321",
      //   "deadline": "2025-01-01T0:0:00.000Z",
      //   "equipment_requirements": undefined,
      //   "fabric_density": undefined,
      //   "file": undefined,
      //   "gender_and_age": [1],
      //   "id": 494,
      //   "images": undefined,
      //   "labeling_requirements": undefined,
      //   "location": 116,
      //   "material_type": undefined,
      //   "minimum_quantity": undefined,
      //   "order_lead_time": undefined,
      //   "order_name": "asdads",
      //   "packaging_requirements": undefined,
      //   "pattern_doc": undefined,
      //   "payment_conditions": undefined,
      //   "payment_for_a_sample": undefined,
      //   "personnel_count": undefined,
      //   "personnel_requirement": undefined,
      //   "photo_urls": ["https://i.ibb.co/ngsjmQw/32580a5396b6.webp"],
      //   "price_for_all": "4.00",
      //   "price_nds": 1,
      //   "price_per_unit": "2",
      //   "price_segment": [1],
      //   "product_type": 123,
      //   "providing_a_sample": undefined,
      //   "purpose": 1,
      //   "raw_materials": undefined,
      //   "regularity_of_order": 1,
      //   "season": 1,
      //   "sewing_a_sample": undefined,
      //   "sizes": undefined,
      //   "special_account": undefined,
      //   "start_date": undefined,
      //   "purchase_type": undefined,
      //   "OTC_access": undefined,
      //   "status": 1
      //   }

        transformDataToServer(formDataToSubmit) // !mutate formDataToSubmit
      console.log('submit', formDataToSubmit);
      try {
        const res = await axios.post(apiEndpoints.bidCreate, formDataToSubmit, { withCredentials: true })
        console.log('res', res);
        if (res.status == 201) {
          const id = res.data.bid_id
          formDataToSubmit.id = id
          const resOther = await axios.post(apiEndpoints.bidOther, formDataToSubmit, { withCredentials: true })
          console.log('resOther: ', resOther);
          const resRequirements = await axios.post(apiEndpoints.bidRequirements, formDataToSubmit, { withCredentials: true })
          console.log('resRequirements: ', resRequirements);
          const resTechnology = await axios.post(apiEndpoints.bidTechnology, formDataToSubmit, { withCredentials: true })
          console.log('resTechnology: ', resTechnology);

          state.currentStage = 6
          state.formData = {}
          state.mediateData = {}
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
    },
    setEditModeData: (state, action) => {
      console.log(action);
      state.isEditMode = action.payload.isEditMode
      state.editModeData.orderId = action.payload.orderId || null
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
  setPrevStage,
  setEditModeData
} = formSlice.actions;

export default formSlice.reducer;




