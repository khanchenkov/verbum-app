import {AppDispatch} from "../store";
import BookService from "../../services/BookService";
import {bookSlice} from "../reducers/BookSlice";

export const getUserBooks = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(bookSlice.actions.fetchingBooks());
        const response = await BookService.getUserBooks();
        dispatch(bookSlice.actions.fetchingBooksSuccess(response.data));
    } catch (e: any) {
        dispatch(bookSlice.actions.fetchingBooksError(e.response?.data?.message))
    }
};
export const uploadBook = (data: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(bookSlice.actions.fetchingBooks());
        const response = await BookService.uploadBook(data);
        dispatch(bookSlice.actions.uploadingBookSuccess());
        return response;
    } catch (e: any) {
        console.log(e.response?.data?.message)
        dispatch(bookSlice.actions.fetchingBooksError(e.response?.data?.message));
    }
};