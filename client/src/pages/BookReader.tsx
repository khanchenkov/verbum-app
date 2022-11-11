import React, {useEffect, useState, useRef, useCallback} from "react";
import ReaderFooter from "../components/ReaderFooter";
import {useAppSelector} from "../hooks/redux";
import styled from "styled-components";
import * as pdfJs from "pdfjs-dist";
import pdfJsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {PDFPageProxy, PDFDocumentProxy, RenderParameters} from "pdfjs-dist/types/src/display/api";
import * as pdfjsLib from "pdfjs-dist";
pdfJs.GlobalWorkerOptions.workerSrc = pdfJsWorker;

const BookReaderBlock = styled.div`
  padding: 10px 0 50px;
`;
const PageBlock = styled.div`
  text-align: center;
`;

const BookReader = () => {
    const currentBook = useAppSelector(state => state.book.currentBook!);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pdfFile, setPdfFile] = useState<PDFDocumentProxy>();
    const [pageNumber, setPageNumber] = useState(1);
    const [offset, setOffset] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(0);
    const [zoomValue, setZoomValue] = useState<number>(100);

    const renderPage = useCallback((pageNum: number, pdf = pdfFile) => {
        pdf && pdf.getPage(pageNum).then(function(page: PDFPageProxy) {
            const viewport = page.getViewport({scale: zoomValue/100});
            const canvas = canvasRef.current!;
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext: canvas.getContext("2d"),
                viewport: viewport
            } as RenderParameters;

            setNumPages(pdf.numPages);

            page.render(renderContext);
        });
    }, [pdfFile, zoomValue]);

    useEffect(() => {
        renderPage(pageNumber, pdfFile);
    }, [pdfFile, pageNumber, renderPage]);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(currentBook.book_path);
        loadingTask.promise.then(loadedPdf => setPdfFile(loadedPdf));
    }, [currentBook.book_path]);

    useEffect(() => {
        document.addEventListener("keydown", keyPressHandler);
        return () => document.removeEventListener("keydown", keyPressHandler)
    }, [keyPressHandler]);
    const changePage = (offset: number) => {
        setPageNumber(prevPage => prevPage + offset);
    };
    const changePageNext = () => {
        changePage(+offset);
    };
    const changePageBack = () =>{
        changePage(-offset);
    };
    function keyPressHandler(e: any) {
        if (e.keyCode === 39  && (pageNumber + 1) < numPages) {
            changePageNext();
        }
        if(e.keyCode === 37 && pageNumber > offset){
            changePageBack();
        }
    }

    return (
        <BookReaderBlock>
            <PageBlock>
                <canvas ref={canvasRef}></canvas>
            </PageBlock>

            <ReaderFooter
                pageNumber={pageNumber}
                numPages={numPages}
                changePageNext={changePageNext}
                changePageBack={changePageBack}
                zoomValue={zoomValue}
                setZoomValue={setZoomValue}
            />
        </BookReaderBlock>
    );
};

export default BookReader;
