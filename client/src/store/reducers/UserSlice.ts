import {UserState} from "../../types/IState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: UserState = {
    isDarkMode: false,
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
        toggleTheme(state) {
            state.isDarkMode = !state.isDarkMode
        }
        // toggleTheme(state, action: PayloadAction<boolean>) {
        //     state.isDarkMode = action.payload
        // }
    }
});

export default userSlice.reducer;