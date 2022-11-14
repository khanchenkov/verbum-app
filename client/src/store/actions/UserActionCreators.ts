import UserService from "../../services/UserService";
import {AppDispatch} from "../store";
import {userSlice} from "../reducers/UserSlice";

export const getUserInfo = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetchingUser());
        const response = await UserService.getUserInfo();
        let responseData = {...response.data};
        const userDate = response.data.user_current_date;
        const currentDate = new Date().toLocaleDateString();
        if (userDate < currentDate) {
            responseData = {...response.data, reading_time: 0};
            await UserService.updateReadingDate(currentDate);
        }
        dispatch(userSlice.actions.fetchingUserSuccess(responseData));
    } catch (e: any) {
        dispatch(userSlice.actions.fetchingUserError(e.response?.data?.message));
    }
}
export const updateUserInfo = (newName: string | undefined, newStatus: string | undefined, newGoal: number | undefined) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetchingUser());
        const response = await UserService.updateUserData(newName, newStatus, newGoal);
        console.log(response)
        dispatch(userSlice.actions.fetchingUserSuccess(response.data));
    } catch (e: any) {
        dispatch(userSlice.actions.fetchingUserError(e.response?.data?.message));
    }
}