import { createSlice } from "@reduxjs/toolkit";

export const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        companiesID: []
    },
    reducers: {
        setCompanies: (state, action) => {
            state.companiesID = action.payload
        }
    }
})

export const { } = companiesSlice.actions
export default companiesSlice.reducer