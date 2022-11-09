import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Book, BookState} from "../../types/IState";

const initialState: BookState = {
    library: [],
    currentBook: {
        id: 0,
        title: "",
        author: "",
        book_path: "",
        thumbnail_path: "",
        pages: 0,
        current_page: 0,
        is_reading: false,
        is_read: false,
        user_id: 0
    },
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
        setCurrentBook(state, action: PayloadAction<number>) {
            state.currentBook = state.library.find((item: Book) => item.id === action.payload);
        },
        uploadingBookSuccess(state) {
            state.isLoading = false;
            state.error = "";
        }
    }
});

export default bookSlice.reducer;