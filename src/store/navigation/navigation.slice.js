import { createSlice } from "@reduxjs/toolkit";
import {isMobile} from "react-device-detect";

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        isNavOpen: !isMobile
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