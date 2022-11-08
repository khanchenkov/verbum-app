import $api from "../http";

export default class UserService {
    static async getUserBooks() {
        return $api.get("/book/user-books");
    }
    static async uploadBook(file: any) {
        return $api.post("/book/upload-book", file);
    }
    static async removeBook(id: number | undefined) {
        return $api.delete(`/book/remove-book/${id}`);
    }
    // static async updateReadingData(bookId, readingTime, currentPage, pages, userId) {
    //     return $api.put('/book/update-reading-data', {bookId, readingTime, currentPage, pages, userId});
    // }
}