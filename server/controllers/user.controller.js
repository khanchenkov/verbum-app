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
            await userService.updateUserData(name, status, goal, refreshToken);
            return res.json({message: "Data successfully updated."});
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
    async resetReadingCounter(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            await userService.resetReadingCounter(refreshToken);
            res.json({message: "Counter has been reset."});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();