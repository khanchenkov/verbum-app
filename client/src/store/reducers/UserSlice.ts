import {User, UserState} from "../../types/IState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: UserState = {
    userInfo: {},
    isLoading: false,
    error: ""
};

export const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        fetchingUser(state) {
            state.isLoading = true;
            state.error = "";
        },
        fetchingUserSuccess(state, action: PayloadAction<User>) {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.error = "";
        },
        fetchingUserError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetReadingTime(state) {
            state.userInfo.reading_time = 0;
        }
    }
});

export default userSlice.reducer;