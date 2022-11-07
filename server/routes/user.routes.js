const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadImageMiddleware = require("../middlewares/upload-image.middleware");

const router = new Router();

router.get("/user-profile", authMiddleware, userController.getUserProfile);
router.put("/update-userdata", authMiddleware, userController.updateUserData);
router.put("/update-user-image", authMiddleware, uploadImageMiddleware.single("avatar"), userController.updateUserImage);
router.put("/update-reading-date", authMiddleware, userController.updateReadingDate);

module.exports = router;