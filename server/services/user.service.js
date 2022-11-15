const tokenService = require("./token.service");
const ApiError = require("../exceptions/api.error");
const pg = require("../database/database");
const {merge, updateDbInterval} = require("../util/index");

class UserService {
    users = new Map();
    interval;
    constructor() {
        this.start();
    }
    async getUserProfile(refreshToken) {
        const email = tokenService.validateRefreshToken(refreshToken).tokenPayload.email;
        const [user] = await pg("user")
            .select("email","id", "user_name", "avatar", "days_reading", "daily_goal", "status", "reading_time", "is_activated", "user_current_date")
            .where("email", email);
        return merge(user, this.users);
    }
    async updateUserData(name, status, goal, refreshToken) {
        const id = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        const [user] = await pg("user")
            .update({ user_name: name, status: status, daily_goal: goal })
            .where("id", id)
            .returning("*");
        return merge(user, this.users);
    }
    async updateUserImage(file, refreshToken) {
        const id = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        if (!file || Object.keys(file).length === 0) {
            throw ApiError.BadRequest("No image sent.");
        }
        await pg("user").update("avatar", file.path).where("id", id);
    }
    async updateReadingDate(refreshToken, currentDate) {
        const id = tokenService.validateRefreshToken(refreshToken).tokenPayload.id;
        await pg("user").update({reading_time: 0, user_current_date: currentDate}).where("id", id);
        this.users.set(id, {reading_time: 0});
    }
    updateReadingData(refreshToken, reading_time) {
        const userId = tokenService.validateRefreshToken(refreshToken)?.tokenPayload?.id;
        return userId && this.users.set(userId, {reading_time});
    }
    stop() {
        clearInterval(this.interval);
    }
    start(){
        this.interval = updateDbInterval(this.users, "users", 1000 * 60 * 10);
    }
}

module.exports = new UserService();