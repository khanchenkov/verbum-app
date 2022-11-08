import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Book, BookState} from "../../types/IState";
import libraryBook from "../../components/LibraryBook";

const initialState: BookState = {
    library: [],
    currentBook: {},
    isLoading: false,
    error: ""
};

export const bookSlice = createSlice({
    initialState,
    name: "book",
    reducers: {
        fetchingBooks(state) {
            state.isLoading = true;
            state.error = "";
        },
        fetchingBooksSuccess(state, action: PayloadAction<Book[]>) {
            state.isLoading = false;
            state.library = action.payload
            state.error = "";
        },
        fetchingBooksError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        uploadingBookSuccess(state) {
            state.isLoading = false;
            state.error = "";
        }
    }
});

export default bookSlice.reducer;