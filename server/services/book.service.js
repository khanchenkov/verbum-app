const fs = require("fs");
const pg = require("../database/database");
const ApiError = require("../exceptions/api.error");
const tokenService = require("./token.service");
const bookFileService = require("./book-file.service");
const iconv = require("iconv-lite");

class BookService {
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
        return pg("book")
            .select("*")
            .where("user_id", userId);
    }
    async removeBook(id) {
        const [removedBook] = await pg("book").del().where("id", id).returning("*");
        fs.unlink(removedBook.path, (err) => {
            if (err) console.log(err);
            else {
                console.log("File was deleted.");
            }
        })
    }
    async createBookList(name, id, refreshToken) {
        const userId = id === null ? tokenService.validateRefreshToken(refreshToken).tokenPayload.id : id;
        await pg("booklist").insert({
            booklist_name: name,
            user_id: userId
        })
    }
    async getUserBookLists(refreshToken) {
        const userId = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        return pg("booklist").select("id", "booklist_name").where("user_id", userId);
    }
    async addBookToBookList(bookId, bookListId) {
        await pg("booklist_book").insert({
            book_id: bookId,
            booklist_id: bookListId
        });
    }
    async getBookList(bookListId) {
        const books = await pg("booklist_book").select("*").where("id", bookListId);
        console.log(books); // TODO
    }
    async removeBookFromBookList(bookId, booklistId) {
        await("booklist_book").del().where({
            book_id: bookId,
            booklist_id: booklistId
        });
    }
    async updateReadingData(readingTime, bookId, currentPage, pages, userId) {
        // let isReading = false;
        // let isRead = false;
        // const readPercent = Math.round(currentPage * 100 / pages);
        // if (currentPage > 1 || currentPage !== pages) {
        //     isReading = true;
        // }
        // if (readPercent > 96) {
        //     isRead = true;
        //     isReading = false;
        // }
        // await userService.updateReadingCounter(readingTime, userId);
        // const [updatedBook] = await pg("book").update({
        //     current_page: currentPage,
        //     is_reading: isReading,
        //     is_read: isRead
        // }).where("id", bookId).returning("*");
        // return updatedBook;
    }
}

module.exports = new BookService();