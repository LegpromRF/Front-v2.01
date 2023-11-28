import { createSlice } from "@reduxjs/toolkit";

export const userdataSlice = createSlice({
    name: 'userdata',
    initialState: {
        username: '',
        specification: null,
    },
    reducers: {
        setUserName: (state, action) => {
            state.username = action.payload
        },
        setSpecification: (state, action) => {
            state.specification = action.payload
        }
    }
})

export const { setUserName, setSpecification } = userdataSlice.actions
export default userdataSlice.reducer