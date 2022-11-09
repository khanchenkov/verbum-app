import React from "react";
import {useAppSelector} from "../hooks/redux";


const BookReader = () => {
    const currentBook = useAppSelector(state => state.book.currentBook);

    return (
        <div>
            <h1>{currentBook!.book_path}</h1>
        </div>
    );
};

export default BookReader;
