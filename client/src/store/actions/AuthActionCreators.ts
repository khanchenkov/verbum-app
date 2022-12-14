import {AppDispatch} from "../store";
import AuthService from "../../services/AuthService";
import {authSlice} from "../reducers/AuthSlice";
import {persistor} from "../store";
import {userSlice} from "../reducers/UserSlice";
import {bookSlice} from "../reducers/BookSlice";

export const registerUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.authFetching());
        const response = await AuthService.registration(email, password);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(authSlice.actions.authFetchingSuccess(response.status === 200));
        window.location.reload()
    } catch (e: any) {
        dispatch(authSlice.actions.authFetchingError(e.response?.data?.message));
    }
};
export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.authFetching());
        const response = await AuthService.login(email, password);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(authSlice.actions.authFetchingSuccess(response.status === 200));
        window.location.reload()
    } catch (e: any) {
        dispatch(authSlice.actions.authFetchingError(e.response?.data?.message));
    }
};
export const logoutUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.authFetching());
        dispatch(bookSlice.actions.resetBookData());
        dispatch(userSlice.actions.resetUserData());
        dispatch(authSlice.actions.authLogout());
        await AuthService.logout();
        await persistor.purge();
        localStorage.removeItem("token");
    } catch (e: any) {
        dispatch(authSlice.actions.authFetchingError(e.response?.data?.message));
    }
};
export const refresh = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.authFetching());
        const response = await AuthService.refresh();
        localStorage.setItem("token", response.data.accessToken);
        dispatch(authSlice.actions.authFetchingSuccess(response.status === 200));
    } catch (e: any) {
        dispatch(authSlice.actions.authFetchingError(e.response?.data?.message));
    }
};
export const forgot = (email: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.authFetching());
        const response = await AuthService.forgot(email);
        dispatch(authSlice.actions.authSuccess());
        return response;
    } catch (e: any) {
        dispatch(authSlice.actions.authFetchingError(e.response?.data?.message));
    }
}
export const checkResetLink = (link: string | undefined) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.authFetching());
        const response = await AuthService.checkLink(link);
        dispatch(authSlice.actions.authSuccess());
        return response;
    } catch (e: any) {
        dispatch(authSlice.actions.authFetchingError(e.response?.data?.message));
    }
}
