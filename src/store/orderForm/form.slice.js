import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        productStep: false,
        purchaseStep: false,
        technologyStep: false,
        conditionsStep: false,
        contactsStep: false,
        formData: {}
    },
    reducers: {
        productSuccess: (state) => {
            state.productStep = true
        },
        purchaseSuccess: (state) => {
            state.purchaseStep = true
        },
        technologySuccess: (state) => {
            state.technologyStep = true
        },
        conditionsSuccess: (state) => {
            state.conditionsStep = true
        },
        contactsSuccess: (state) => {
            state.contactsStep = true
        },
        updateFormData: (state, payload) => {
            state.formData = {...state.formData, ...payload}
        }
    }
})

export const { updateFormData, productSuccess, purchaseSuccess, technologySuccess, conditionsSuccess, contactsSuccess } = formSlice.actions
export default formSlice.reducer