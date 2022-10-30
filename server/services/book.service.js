const fs = require('fs');
const pg = require("../database/database");
const ApiError = require("../exceptions/api.error");
const tokenService = require("./token.service");
const bookFileService = require("./book-file.service");
const iconv = require("iconv-lite");

// const userService = require('./user.service');

class BookService {
    async uploadBook(file, refreshToken) {
        const userId = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        if (!file || Object.keys(file).length === 0) {
            throw ApiError.BadRequest("File wasn't added.");
        }
        const {pages, title, author} = await bookFileService.getMetaData(file);
        const newBook = {
            title: title ? title.trim() : iconv.decode(file.originalname, "UTF-8").replace(/\.\w{1,4}$/, ""),
            author: author ? author.trim() : "Unknown author",
            path: file.path,
            pages: pages,
            user_id: userId
        };
        await pg("book").insert(newBook);
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

    // async getUserBookLists(refreshToken) {
    //     if (!refreshToken) {
    //         throw ApiError.UnauthorizedError();
    //     }
    //     const {tokenPayload} = tokenService.validateRefreshToken(refreshToken);
    //     // return pg("booklist_book").select("*").where("user_id", tokenPayload.id);
    // }
    // async addBookToBookList(bookId, booklistId) {
    //     await("booklist_book").insert({
    //         book_id: bookId,
    //         booklist_id: booklistId
    //     })
    // }
    // async removeFromBookList(bookId, booklistId) {
    //     await("booklist_book").del().where({
    //         book_id: bookId,
    //         booklist_id: booklistId
    //     })
    // }
    // async updateReadingData(readingTime, bookId, currentPage, pages, userId) {
    //     let isReading = false;
    //     let isRead = false
    //     const readPercent = Math.round(currentPage * 100 / pages);
    //     if (currentPage > 1 || currentPage !== pages) {
    //         isReading = true;
    //     }
    //     if (readPercent > 96) {
    //         isRead = true;
    //         isReading = false;
    //     }
    //     await userService.updateUserReadingData(readingTime, userId);
    //     const [updatedBook] = await pg("book").update({
    //         current_page: currentPage,
    //         is_reading: isReading,
    //         is_read: isRead
    //     }).where("id", bookId).returning("*");
    //     return updatedBook;
    // }

}

module.exports = new BookService();