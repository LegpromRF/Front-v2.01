import { createSlice } from "@reduxjs/toolkit";

export const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        companiesID: []
    },
    reducers: {
        setCompanies: (state, payload) => {
            state.companiesID = payload
        }
    }
})

export const { } = companiesSlice.actions
export default companiesSlice.reducer