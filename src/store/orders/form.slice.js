import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { transformDataToServer } from "./utils";
import { fetchEditForm, fetchForm } from "../../utils/services/createOrder/fetchForm";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";
import axios from "axios";

export const submitForm = createAsyncThunk('form/submitForm', async (_, thunkAPI) => {
  thunkAPI.dispatch(setFormLoading(true))
  const state = thunkAPI.getState().form
  let formDataToSubmit = {...state.formData}
  // console.log('submit: ', formDataToSubmit);
  transformDataToServer(formDataToSubmit) // !mutate formDataToSubmit
  
  if (state.isEditMode) {
    formDataToSubmit.id = state.editModeData.orderId
    const res = await fetchEditForm(formDataToSubmit)
    thunkAPI.dispatch(setFormLoading(false))
    return res.ok
  } else {
    const res = await fetchForm(formDataToSubmit)
    thunkAPI.dispatch(setFormLoading(false))
    return res.ok
  }
})

export const loadFormForEdit = createAsyncThunk('form/loadFormForEdit', async (id, thunkAPI) => {
  try {
    thunkAPI.dispatch(setFormLoading(true))
    let form = {}
    
    let res = await axios.get(apiEndpoints.getBidCreate(id), { withCredentials: true, AccessControlAllowOrigin: true, })
    if (res.status == 200) form = {...form, ...res.data}
    // console.log(res);
    res = await axios.get(apiEndpoints.getBidTechnology(id), { withCredentials: true, AccessControlAllowOrigin: true, })
    if (res.status == 200) form = {...form, ...res.data}
    // console.log(res);
    res = await axios.get(apiEndpoints.getBidRequirements(id), { withCredentials: true, AccessControlAllowOrigin: true, })
    if (res.status == 200) form = {...form, ...res.data}
    // console.log(res);
    res = await axios.get(apiEndpoints.getBidOther(id), { withCredentials: true, AccessControlAllowOrigin: true, })
    if (res.status == 200) form = {...form, ...res.data}
    // console.log(res);
    thunkAPI.dispatch(setFormLoading(false))
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
      orderId: null,
      isFormLoading: false
    },
    isFormFetchingSuccess: null,
    formData: {},
    mediateData: {
      doc_urls: null,
      photo_urls: null
    } //поля, которые помогают возвращать загруженные фото и файлы в форму, если пользователь ушел со страницы и вернулся 
  },
  reducers: {
    setCurrentStage: (state, action) => {
      let newStage = action.payload;
      if (newStage > state.currentStage) return 

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
    setFormFetchingSuccess: (state, action) => {
      state.isFormFetchingSuccess = action.payload
    },
    setFormLoading: (state, action) => {
      state.editModeData.isFormLoading = action.payload
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      // console.log(state.formData);
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
      state.editModeData.isFormLoading = action.payload.orderId || null
    },
    clearData: (state) => {
      state.formData = {}
      state.mediateData = {}
      state.currentStage = 1
      state.isFormFetchingSuccess = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(submitForm.fulfilled, (state, action) => {
      const isOk = action.payload
      if (isOk) {
        state.formData = {}
        state.mediateData = {}
        state.isFormFetchingSuccess = true
      } else {
        state.isFormFetchingSuccess = false
      }
      state.currentStage = 6
    })
      .addCase(loadFormForEdit.fulfilled, (state, action) => {
        state.formData = action.payload
        state.editModeData.isFormLoading = false
      })
      
  },
});

export const getFormField = (name) => useSelector(state => state?.form?.formData?.[name])
export const getMediateField = (name) => useSelector(state => state?.form?.mediateData?.[name])

export const {
  updateFormData,
  updateMediateData,
  setFormLoading,
  setCurrentStage,
  setNextStage,
  setPrevStage,
  setEditModeData,
  clearData
} = formSlice.actions;

export default formSlice.reducer;




