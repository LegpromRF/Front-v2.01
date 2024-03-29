import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { transformDataToServer } from "./utils";
import { fetchEditForm, fetchForm } from "../../utils/services/createOrder/fetchForm";
import { apiEndpoints } from "../../utils/constants/apiEndpoints";
import axios from "axios";

export const submitForm = createAsyncThunk('form/submitForm', async (_, thunkAPI) => {
  const state = thunkAPI.getState().form
  let formDataToSubmit = {...state.formData}
  transformDataToServer(formDataToSubmit) // !mutate formDataToSubmit
  // console.log('submit: ', formDataToSubmit);
  
  if (state.isEditMode) {
    formDataToSubmit.id = state.editModeData.orderId
    const res = await fetchEditForm(formDataToSubmit)
    return res.ok
  } else {
    const res = await fetchForm(formDataToSubmit)
    return res.ok
  }
})

export const loadFormForEdit = createAsyncThunk('form/loadFormForEdit', async (id, thunkAPI) => {
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
  return form
})

export const stagesCount = 5

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
    stageFields: {
      product: {
        number: 1,
        fields: []
      },
      purchase: {
        number: 2,
        fields: []
      },
      technology: {
        number: 3,
        fields: []
      },
      conditions: {
        number: 4,
        fields: []
      },
      contacts: {
        number: 5,
        fields: []
      },
    }
  },
  reducers: {
    setCurrentStage: (state, action) => {
      let newStage = action.payload;

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
    setEditModeData: (state, action) => {
      if (state.isEditMode == action.payload.isEditMode) return
      state.formData = {}
      state.currentStage = 1
      state.isEditMode = action.payload.isEditMode
      state.editModeData.orderId = action.payload.orderId || null
      state.editModeData.isFormLoading = action.payload.isEditMode || null
    },
    setStageFields: (state, action) => {
      state.stageFields[action.payload.name].fields = action.payload.fields
    },
    clearData: (state) => {
      state.formData = {}
      state.currentStage = 1
      state.isFormFetchingSuccess = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(submitForm.fulfilled, (state, action) => {
      const isOk = action.payload
      if (isOk) {
        state.isFormFetchingSuccess = true
      } else {
        state.isFormFetchingSuccess = false
      }
      state.formData = {}
      state.currentStage = 1
      state.editModeData.isFormLoading = false
    })
    .addCase(submitForm.pending, (state) => {
      state.editModeData.isFormLoading = true
    })
    .addCase(submitForm.rejected, (state) => {
      state.editModeData.isFormLoading = false
    })
    .addCase(loadFormForEdit.fulfilled, (state, action) => {
      // console.log(action);
      state.formData = action.payload
      state.editModeData.isFormLoading = false
    })
    .addCase(loadFormForEdit.pending, (state) => {
      state.editModeData.isFormLoading = true
    })
    .addCase(loadFormForEdit.rejected, (state, action) => {
      // state.editModeData.isFormLoading = false
    })
      
  },
});

export const getFormField = (name) => useSelector(state => state?.form?.formData?.[name])


export const getStageNumberByStageFields = (stageFields, field) => {
  return Object.values(stageFields).find((stageData) => stageData.fields.includes(field))?.number
}

export const {
  updateFormData,
  setFormLoading,
  setFormFetchingSuccess,
  setCurrentStage,
  setNextStage,
  setPrevStage,
  setEditModeData,
  setStageFields,
  clearData
} = formSlice.actions;

export default formSlice.reducer;




