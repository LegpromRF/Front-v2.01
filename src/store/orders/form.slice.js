import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { transformDataToServer } from "./utils";
import { fetchEditForm, fetchForm } from "../../utils/services/createOrder/fetchForm";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";
import axios from "axios";

export const loadFormForEdit = createAsyncThunk('form/loadFormForEdit', async (id) => {
  try {
    let form = {}
    
    let res = await axios.get(apiEndpoints.getBidCreate(id), { withCredentials: true })
    if (res.status == 200) form = {...form, ...res.data}
    console.log(res);
    // res = await axios.get(apiEndpoints.orderCardsTechnology(id), { withCredentials: true })
    // if (res.status == 200) form = {...form, ...res.data}
    // console.log(res);
    res = await axios.get(apiEndpoints.orderCardsRequirements(id), { withCredentials: true })
    if (res.status == 200) form = {...form, ...res.data}
    console.log(res);
    res = await axios.get(apiEndpoints.orderCardsOther(id), { withCredentials: true })
    if (res.status == 200) form = {...form, ...res.data}
    console.log(res);

    return form
  } catch(e) {
    console.error(e);
  }
})

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
    updateAndSubmitFormData: (state, action) => {
      
      state.formData = { ...state.formData, ...action.payload };
      let formDataToSubmit = {...state.formData}
      console.log(formDataToSubmit);
      transformDataToServer(formDataToSubmit) // !mutate formDataToSubmit
      
      if (state.isEditMode) {
        formDataToSubmit.id = state.editModeData.orderId
        fetchEditForm(formDataToSubmit).then(res => {
          if (res.ok) { state.currentStage = 6
          state.formData = {}
          state.mediateData = {}
        }
        })
      } else {
        fetchForm(formDataToSubmit).then(res => {
          if (res.ok) {
            state.currentStage = 6
          state.formData = {}
          state.mediateData = {}
          }
        })
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
      if (state.isEditMode == action.payload.isEditMode) return
      state.formData = {}
      state.mediateData = {}
      state.currentStage = 1
      state.isEditMode = action.payload.isEditMode
      state.editModeData.orderId = action.payload.orderId || null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFormForEdit.fulfilled, (state, action) => {
        state.formData = action.payload
      })
  },
});

export const getFormField = (name) => useSelector(state => state?.form?.formData?.[name])
export const getMediateField = (name) => useSelector(state => state?.form?.mediateData?.[name])

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




