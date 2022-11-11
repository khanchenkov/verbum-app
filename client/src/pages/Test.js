import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {useAppSelector} from "../hooks/redux";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;


export default function Test(){
    const currentBook = useAppSelector(state => state.book.currentBook);

    const canvasRef = useRef();


    const [pdfRef, setPdfRef] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const renderPage = useCallback((pageNum, pdf=pdfRef) => {
        pdf && pdf.getPage(pageNum).then(function(page) {
            const viewport = page.getViewport({scale: 1.5});
            const canvas = canvasRef.current;
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };
            page.render(renderContext);
        });
    }, [pdfRef]);

    useEffect(() => {
        renderPage(currentPage, pdfRef);
    }, [pdfRef, currentPage, renderPage]);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(currentBook.book_path);
        loadingTask.promise.then(loadedPdf => {
            setPdfRef(loadedPdf);
        }, function (reason) {
            console.error(reason);
        });
    }, [currentBook.book_path]);

    const nextPage = () => pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return <canvas ref={canvasRef}></canvas>;
}