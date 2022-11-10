import React from "react";
import {useAppSelector} from "../hooks/redux";
import ReaderFooter from "../components/ReaderFooter";
import styled from "styled-components";
import * as PDFJS from "pdfjs-dist/build/pdf";
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

const BookReader = () => {
    const currentBook = useAppSelector(state => state.book.currentBook);

    // console.log(pdfjsLib.isPdfFile(currentBook!.book_path))

    return (
        <>
            <div>
                <h1>{currentBook!.book_path}</h1>
            </div>

            <ReaderFooter/>
        </>
    );
};

export default BookReader;
