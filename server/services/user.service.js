const tokenService = require("./token.service");
const ApiError = require("../exceptions/api.error");
const pg = require("../database/database");

class UserService {
    async getUserProfile(refreshToken) {
        const email = tokenService.validateRefreshToken(refreshToken).tokenPayload.email;
        const [user] = await pg("user")
            .select("email","id", "user_name", "avatar", "days_reading", "daily_goal", "status", "reading_time", "is_activated")
            .where("email", email);
        return user;
    }
    async updateUserData(name, status, goal, refreshToken) {
        const id = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        console.log('id:', id)
        await pg("user")
            .update({ user_name: name, status: status, daily_goal: goal })
            .where("id", id);
    }
    async updateUserImage(file, refreshToken) {
        const id = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        if (!file || Object.keys(file).length === 0) {
            throw ApiError.BadRequest("No image sent.");
        }
        await pg("user").update("avatar", file.path).where("id", id);
    }
    async updateReadingCounter(readingTime, userId) {
        await pg("user").update("reading_time", readingTime).where("id", userId);
    }
    async resetReadingCounter(refreshToken) {
        const id = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        await pg("user").update("reading_time", 0).where("id", id);
    }
}

module.exports = new UserService();