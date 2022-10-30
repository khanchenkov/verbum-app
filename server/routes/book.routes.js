const Router = require("express").Router;
const authMiddleware = require("../middlewares/auth.middleware");
const bookController = require("../controllers/book.controller");
const uploadBookMiddleware = require('../middlewares/upload-book.middleware');

const router = new Router();

router.post("/upload-book", authMiddleware, uploadBookMiddleware.single("book"), bookController.uploadBook);
router.get("/user-books", authMiddleware, bookController.getUserBooks);
router.delete("/remove-book/:id", authMiddleware, bookController.removeBook);

router.get("/user-booklist", authMiddleware, bookController.getUserBookList);

// router.post('/add-to-booklist', authMiddleware, bookController.addBookToBookList);
// router.post('/remove-from-booklist', authMiddleware, bookController.removeFromBookList);
// router.put('/update-reading-data', authMiddleware, bookController.updateReadingData);

module.exports = router;