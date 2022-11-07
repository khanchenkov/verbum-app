const userService = require("../services/user.service")

class UserController {
    async getUserProfile(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.getUserProfile(refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async updateUserData(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const {name, status, goal} = req.body;
            const updUserData = await userService.updateUserData(name, status, goal, refreshToken);
            return res.json(updUserData);
        } catch (e) {
            next(e);
        }
    }
    async updateReadingDate(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const {currentDate} = req.body;
            await userService.updateReadingDate(refreshToken, currentDate);
            res.json({message: "Date and reading time was successfully updated."})
        } catch (e) {
            next(e);
        }
    }
    async updateUserImage(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const image = req.file;
            await userService.updateUserImage(image, refreshToken);
            return res.json({message: "Image successfully updated."});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();