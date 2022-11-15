const bookService = require('../services/book.service');
const userService = require('../services/user.service');

class BookController {
    async uploadBook(req, res, next) {
        try {
            const bookFile = req.file;
            const {refreshToken} = req.cookies;
            const response = await bookService.uploadBook(bookFile, refreshToken)
            res.json(response);
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
    async updateReadingData(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const {bookId, readingTime, currentPage, pages} = req.body;
            userService.updateReadingData(refreshToken, readingTime);
            const updatedResult = await bookService.updateReadingData(refreshToken, bookId, readingTime, currentPage, pages);
            return res.json(updatedResult);
        } catch (e) {
            next(e);
        }
    }

    // async createBookList(req, res, next) {
    //     try {
    //         const {refreshToken} = req.cookies;
    //         const {name} = req.body;
    //         await bookService.createBookList(name, null, refreshToken);
    //         return res.json({message: "Book list successfully has been created."})
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async getUserBookLists(req, res, next) {
    //     try {
    //         const {refreshToken} = req.cookies;
    //         const userBookLists = await bookService.getUserBookLists(refreshToken);
    //         return res.json(userBookLists);
    //     } catch(e) {
    //         next(e);
    //     }
    // }
    // async addBookToBookList(req, res, next) {
    //     try {
    //         const {bookId, bookListId} = req.body;
    //         await bookService.addBookToBookList(bookId, bookListId);
    //         return res.json({message: "Book was successfully added to book list."})
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async getBookList(req, res, next) {
    //     try {
    //         const bookListId = req.params.id;
    //         const bookList = await bookService.getBookList(bookListId);
    //         return res.json(bookList);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async removeBookFromBookList(req, res, next) {
    //     try {
    //         const {bookId, bookListId} = req.body;
    //         await bookService.removeBookFromBookList(bookId, bookListId);
    //         return res.json({message: "Book was successfully removed from book list."})
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

module.exports = new BookController();