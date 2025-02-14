import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isSessionExpired: false,
        verificationToken: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { fastKey } = action.payload;
            state.token = fastKey;
        },
        logOut: (state) => {
            state.token = null;
        },
        setSessionExpired: (state, action) => {
            state.isSessionExpired = action.payload;
        }
    }
})

export const { setCredentials, logOut, setSessionExpired } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentKey = (state: any) => state.auth.token;