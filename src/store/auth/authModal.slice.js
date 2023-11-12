import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState: {
        isShown: false,
        authMode: 'register',
        authMethod: 'email',
        verifying: false,
        authIssue: '',
    },
    reducers: {
        toggleModal: (state) => {
            state.isShown = !state.isShown
        },
        setModal: (state, action) => {
            state.isShown = action.payload
        },
        setAuthMode: (state, action) => {
            state.authMode = action.payload
        },
        setAuthMethod: (state, action) => {
            state.authMethod = action.payload
        },
        setVerifying: (state) => {
            state.verifying = true
            state.authMode = null
        },
        setAuthIssue: (state, action) => {
            state.authIssue = action.payload
        }
    }
})

export const {
    toggleModal,
    setModal,
    setAuthMethod,
    setAuthMode,
    setVerifying
} = authModalSlice.actions
export default authModalSlice.reducer