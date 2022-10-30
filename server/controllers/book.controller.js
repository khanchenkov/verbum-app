const bookService = require('../services/book.service');

class BookController {
    async uploadBook(req, res, next) {
        try {
            const bookFile = req.file;
            const {refreshToken} = req.cookies;
            await bookService.uploadBook(bookFile, refreshToken)
            res.json({message: "Book has been successfully uploaded."});
        } catch (e) {
            next(e);
        }
    }
    async getUserBooks(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userBooks = await bookService.getUserBooks(refreshToken);
            return res.json(userBooks);
        } catch (e) {
            next(e);
        }
    }
    async removeBook(req, res, next) {
        try {
            const id = req.params.id;
            await bookService.removeBook(id);
        } catch (e) {
            next(e);
        }
    }

    async getUserBookList(req, res, next) {
        try {
    //         const {refreshToken} = req.cookies;
    //         const userBookLists = await bookService.getUserBookLists(refreshToken);
    //         return res.json(userBookLists);
        } catch(e) {
            next(e);
        }
    }
    // async addBookToBookList(req, res, next) {
    //     try {
    //
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async removeFromBookList(req, res, next) {
    //     try {
    //
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async updateReadingData(req, res, next) {
    //     try {
    //         const {bookId, readingTime, currentPage, pages, userId} = req.body;
    //         const updatedRes = await bookService.updateReadingData(readingTime, bookId, currentPage, pages, userId);
    //         return res.json(updatedRes);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

module.exports = new BookController();