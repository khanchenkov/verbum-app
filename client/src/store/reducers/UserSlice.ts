import {UserState} from "../../types/IState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: UserState = {
    currentBook: {},
    userInfo: {},
    userLibrary: [],
    error: "",
    isLoading: false,
};

export const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        // toggleTheme(state, action: PayloadAction<boolean>) {
        //     state.isDarkMode = action.payload
        // }
    }
});

export default userSlice.reducer;