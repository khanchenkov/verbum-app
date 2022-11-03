import {AuthState} from "../../types/IState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = <AuthState>{
    isLoading: false,
    isAuth: false,
    error: ""
};

export const authSlice = createSlice({
    initialState: initialState,
    name: "Auth",
    reducers: {
        authFetching(state) {
            state.isLoading = true;
            state.error = "";
        },
        authLogout(state) {
            state.isLoading = false;
            state.isAuth = false;
        },
        authSuccess(state) {
            state.isLoading = false;
            state.error = "";
        },
        authFetchingSuccess(state, action: PayloadAction<boolean>) {
            state.isLoading = false;
            state.isAuth = action.payload;
            state.error = "";
        },
        authFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearAuthErrors(state) {
            state.error = "";
        }
    }
});

export default authSlice.reducer;