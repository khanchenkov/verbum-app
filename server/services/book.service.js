const fs = require("fs");
const pg = require("../database/database");
const ApiError = require("../exceptions/api.error");
const tokenService = require("./token.service");
const bookFileService = require("./book-file.service");
const iconv = require("iconv-lite");
const {merge, updateDbInterval} = require("../util/index");

class BookService {
    books = new Map();
    interval;
    constructor() {
        this.start();
    }
    async uploadBook(file, refreshToken) {
        const userId = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        if (!file || Object.keys(file).length === 0) {
            throw ApiError.BadRequest("File wasn't added.");
        }
        const {pages, title, author} = await bookFileService.getPdfMetaData(file);
        const bookTitle = title ? title.trim() : iconv.decode(file.originalname, "UTF-8").replace(/\.\w{1,4}$/, "");
        const bookAuthor = author ? author.trim() : "Unknown author";
        const [candidate] = await pg("book")
            .select("*")
            .where({title: bookTitle, author: bookAuthor, pages: pages, user_id: userId});
        if (candidate) {
            throw ApiError.BadRequest("File was already added.");
        }
        const thumbnail_path = await bookFileService.getPdfThumbnail(file.path, file.filename, userId);
        const newBook = {
            title: bookTitle,
            author: bookAuthor,
            book_path: file.path,
            thumbnail_path: thumbnail_path,
            pages: pages,
            is_read: false,
            is_reading: false,
            current_page: 0,
            user_id: userId
        };
        await pg("book").insert(newBook).returning("*");
        return {message: "File was successfully uploaded."};
    }
    async getUserBooks(refreshToken) {
        const userId = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        return await pg("book").select("*").where("user_id", userId).map(x => merge(x, this.books));
    }
    async removeBook(id) {
        const [removedBook] = await pg("book").del().where("id", id).returning("*");
        fs.unlink(removedBook.book_path, (err) => {
            if (err) console.log(err);
            else {
                console.log("Book file was deleted.");
            }
        });
        fs.unlink(removedBook.thumbnail_path, (err) => {
            if (err) console.log(err);
            else {
                console.log("Thumbnail was deleted.");
            }
        });
        this.books.delete(id);
    }
    async updateReadingData(refreshToken, bookId, readingTime, current_page, pages) {
        const is_read = current_page + 3 >= pages, is_reading = !is_read;
        this.books.set(bookId, {current_page, is_reading, is_read});
        return {message: "Book was successfully updated."};
    }
    start() {
        this.interval = updateDbInterval(this.books, "books", 1000 * 60 * 10);
    }
    stop() {
        clearInterval(this.interval);
    }
    // async createBookList(name, id, refreshToken) {
    //     const userId = id === null ? tokenService.validateRefreshToken(refreshToken).tokenPayload.id : id;
    //     await pg("booklist").insert({
    //         booklist_name: name,
    //         user_id: userId
    //     })
    // }
    // async getUserBookLists(refreshToken) {
    //     const userId = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
    //     return pg("booklist").select("id", "booklist_name").where("user_id", userId);
    // }
    // async addBookToBookList(bookId, bookListId) {
    //     await pg("booklist_book").insert({
    //         book_id: bookId,
    //         booklist_id: bookListId
    //     });
    // }
    // async getBookList(bookListId) {
    //     const books = await pg("booklist_book").select("*").where("id", bookListId);
    //     console.log(books);
    // }
    // async removeBookFromBookList(bookId, booklistId) {
    //     await("booklist_book").del().where({
    //         book_id: bookId,
    //         booklist_id: booklistId
    //     });
    // }
}

module.exports = new BookService();