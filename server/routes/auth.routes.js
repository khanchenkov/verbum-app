const Router = require("express").Router;
const {body} = require("express-validator");
const authController = require("../controllers/auth.controller");

const router = new Router();

router.post("/registration",
    body("email").isEmail(), body("password").isLength({min: 3, max: 32}),
    authController.registration);
router.get("/activate/:link", authController.activate);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.post("/forgot", body("email").isEmail(), authController.forgot);
router.get("/reset/:link", authController.setResetToken);
router.post("/check-reset-link", authController.checkResetLink);
router.post("/reset-password", body("password").isLength({min: 3, max: 32}), authController.resetPassword);

module.exports = router;
