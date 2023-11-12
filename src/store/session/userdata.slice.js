import { createSlice } from "@reduxjs/toolkit";

export const userdataSlice = createSlice({
    name: 'userdata',
    initialState: {
        username: '',
    },
    reducers: {
        setUserName: (state, action) => {
            state.username = action.payload
        }
    }
})

export const { setUserName } = userdataSlice.actions
export default userdataSlice.reducer