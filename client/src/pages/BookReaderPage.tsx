import React, {useEffect, useState, useRef, useCallback, FC} from "react";
import ReaderFooter from "../components/ReaderFooter";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import styled from "styled-components";
import {BookReaderProps} from "../types/IProps";
import {PageBlockProps} from "../types/IStyled";
import * as pdfJs from "pdfjs-dist";
import pdfJsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {PDFPageProxy, PDFDocumentProxy, RenderParameters} from "pdfjs-dist/types/src/display/api";
import * as pdfjsLib from "pdfjs-dist";
import {bookSlice} from "../store/reducers/BookSlice";
import {userSlice} from "../store/reducers/UserSlice";
import {updateBook} from "../store/actions/BookActionCreators";
pdfJs.GlobalWorkerOptions.workerSrc = pdfJsWorker;

const BookReaderBlock = styled.div`
  padding: 10px 0 50px;
`;
const PageBlock = styled.div<PageBlockProps>`
  text-align: center;
  @media (max-width: 575px) {
    margin-top: ${({viewportHeight}) => `calc((100vh - 60px - ${viewportHeight}px) / 2)`}; 
  }
`;

const BookReaderPage: FC<BookReaderProps> = ({containerRef}) => {
    const dispatch = useAppDispatch();
    const {book_path, pages, current_page, id} = useAppSelector(state => state.book.currentBook!);
    const reading_time = useAppSelector(state => state.user.userInfo.reading_time)

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pdfFile, setPdfFile] = useState<PDFDocumentProxy>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [offset, setOffset] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(pages);
    const [zoomValue, setZoomValue] = useState<number>(100);
    const [viewportHeight, setViewportHeight] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const renderPage = useCallback((pageNum: number, pdf = pdfFile) => {
        pdf && pdf.getPage(pageNum).then(function(page: PDFPageProxy) {
            dispatch(bookSlice.actions.fetchingBooks());
            const canvas = canvasRef.current!;
            const viewport = page.getViewport({scale: 1});
            const desiredHeight = document.body.clientHeight - 65;
            const desiredScale = desiredHeight / viewport.height;
            let scaledViewport;
            const scaleRatio = zoomValue / 100;
            scaledViewport = page.getViewport({scale: desiredScale * scaleRatio});
            if (scaledViewport.width > document.body.clientWidth) {
                const desiredWidth = 280 + (1140 - 280) * ((document.body.clientWidth - 280) / (1440 - 280));
                const desiredScale = desiredWidth / viewport.width;
                scaledViewport = page.getViewport({scale: desiredScale * scaleRatio});
            }
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;
            const renderContext = {
                canvasContext: canvas.getContext("2d"),
                viewport: scaledViewport
            } as RenderParameters;
            setNumPages(pdf.numPages);
            setViewportHeight(scaledViewport.height)
            page.render(renderContext);
            dispatch(bookSlice.actions.uploadingBookSuccess());
        });
    }, [pdfFile, zoomValue, dispatch]);
    const changePage = async (offset: number) => {
        await dispatch(bookSlice.actions.updateCurrentBookPages(pageNumber + offset));
        setPageNumber(prevPage => prevPage + offset);
    };
    const changePageNext = useCallback(() => {
        (pageNumber + 1) <= numPages && changePage(+offset);
    }, [pageNumber, offset, numPages]);
    const changePageBack = useCallback(() => {
        pageNumber > offset && changePage(-offset);
    }, [pageNumber, offset]);
    const keyPressHandler = useCallback((e: any) => {
        if (e.keyCode === 39  && (pageNumber + 1) <= numPages) {
            changePageNext();
        }
        if(e.keyCode === 37 && pageNumber > offset) {
            changePageBack();
        }
    }, [changePageNext, changePageBack, numPages, offset, pageNumber])

    useEffect(() => {
        document.addEventListener("keydown", keyPressHandler);
        return () => document.removeEventListener("keydown", keyPressHandler)
    }, [keyPressHandler]);
    useEffect(() => {
        const canvas = containerRef.current;
        canvas.style.width = "100%"
        return () => {canvas.style.width = "calc(280px + (1140 - 280) * ((100vw - 280px) / (1440 - 280)))"}
    }, [containerRef]);
    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(book_path);
        loadingTask.promise.then(loadedPdf => setPdfFile(loadedPdf));
    }, [book_path]);
    useEffect(() => {
        setOffset(1);
        const currentPage = current_page === 0 ? 1 : current_page;
        setPageNumber(currentPage);
        renderPage(pageNumber, pdfFile);
    }, [pdfFile, pageNumber, renderPage]);


    useEffect(() => {
        const readingTimeInterval = setInterval(async () => {
            setSeconds(seconds => seconds + 1);
            await dispatch(userSlice.actions.updateReadingTime(1));
        }, 1000);
        return () => clearInterval(readingTimeInterval);
    }, []);


    useEffect(() => {
        (() => dispatch(updateBook(id, reading_time, current_page, pages)))()
    }, [current_page, reading_time])

    return (
        <BookReaderBlock>
            <PageBlock viewportHeight={viewportHeight}>
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

export default BookReaderPage;
