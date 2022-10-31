const Router = require("express").Router;
const authMiddleware = require("../middlewares/auth.middleware");
const bookController = require("../controllers/book.controller");
const uploadBookMiddleware = require("../middlewares/upload-book.middleware");

const router = new Router();

router.post("/upload-book", authMiddleware, uploadBookMiddleware.single("book"), bookController.uploadBook);
router.get("/user-books", authMiddleware, bookController.getUserBooks);
router.delete("/remove-book/:id", authMiddleware, bookController.removeBook);
router.put("/update-reading-data", authMiddleware, bookController.updateReadingData); // TODO

router.post("/create-book-list", authMiddleware, bookController.createBookList);
router.get("/user-book-lists", authMiddleware, bookController.getUserBookLists);
router.post("/add-book-to-list", authMiddleware, bookController.addBookToBookList);


router.get("/get-book-list/:id", authMiddleware, bookController.getBookList);
router.post("/remove-book-from-list/:id", authMiddleware, bookController.removeBookFromBookList);

module.exports = router;