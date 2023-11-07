import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        isNavOpen: true
    },
    reducers: {
        toggleNav: (state) => {
            state.isNavOpen = !state.isNavOpen
        },
        setNav: (state, action) => {
            state.isNavOpen = action.payload
        }
    }
})

export const { toggleNav, setNav } = navigationSlice.actions
export default navigationSlice.reducer