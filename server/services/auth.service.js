const bcrypt = require("bcrypt");
const uuid = require("uuid");
const pg = require("../database/database");
const ApiError = require("../exceptions/api.error");
const mailService = require("../services/mail.service");
const tokenService = require("../services/token.service");
const bookService = require("../services/book.service");
const API_URL = process.env.PRODUCTION === "true" ? process.env.DEPLOY_API_URL : process.env.LOCAL_API_URL;

class AuthService {
    async registration(email, password) {
        const [candidate] = await pg("user").select("id").where("email", email);
        if (candidate) {
            throw ApiError.BadRequest("Email is invalid or already taken.");
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const link = uuid.v4();
        const [user] = await pg("user").insert({
            email,
            user_password: hashPassword,
            user_name: 'Reader',
            avatar: 'assets\\profile-image-cap.png',
            status: 'My status',
            user_current_date: '14.02.2000',
            days_reading: 0,
            daily_goal: 0,
            reading_time: 0,
            is_activated: false,
            activation_link: link,
            reset_link: null
        }).returning("*");
        await mailService.sendActivationMail(email, `${API_URL}/api/auth/activate/${link}`, API_URL);
        return tokenService.saveGeneratedTokens(user);
    }
    async activate(link) {
        const [userData] = await pg("user").select("activation_link", "id").where("activation_link", link);
        if (!userData.activation_link || !uuid.validate(userData.activation_link)) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }
        await pg("user").update({is_activated: true}).where("id", userData.id);
        await bookService.createBookList("Want to read", userData.id, null)
    }
    async login(email, password) {
        const [user] = await pg("user").select("*").where("email", email);
        if (!user) {
            throw ApiError.BadRequest("Email or password is incorrect.");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.user_password);
        if (!isPasswordCorrect) {
            throw ApiError.BadRequest("Email or password is incorrect.");
        }
        return tokenService.saveGeneratedTokens(user);
    }
    async logout(refreshToken) {
        return tokenService.removeToken(refreshToken);
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const tokenExist = await tokenService.findToken(refreshToken);
        const decodedToken = tokenService.validateRefreshToken(refreshToken);
        if (!tokenExist.refresh_token || !decodedToken.tokenPayload) {
            throw ApiError.UnauthorizedError();
        }
        const [user] = await pg("user").select("*").where("id", decodedToken.tokenPayload.id);
        return tokenService.saveGeneratedTokens(user);
    }
    async forgot(email) {
        const [candidate] = await pg("user").select("*").where("email", email);
        if (!candidate) {
            throw ApiError.BadRequest("Couldn't sent link for some reason.");
        }
        const link = uuid.v4();
        await pg("user").update({reset_link: link}).where("email", email);
        await mailService.sendResetMail(email, `${API_URL}/api/auth/reset/${link}`, API_URL);
    }
    async resetLinkCheck(link) {
        const [user] = await pg("user").select("*").where('reset_link', link);
        if (!user || !uuid.validate(link)) {
            throw ApiError.BadRequest("Invalid reset link.");
        }
        const resetToken = tokenService.generateResetToken(user);
        return {link, resetToken};
    }
    async checkResetLink(link, resetToken) {
        if (!resetToken) {
            throw ApiError.BadRequest("The session has expired, follow the link from the email again.");
        }
        const email = tokenService.validateResetToken(resetToken).tokenPayload.email;
        const [userResetLink] = await pg("user").select("reset_link").where("email", email);
        return userResetLink.reset_link === link;
    }
    async resetPassword(resetToken, password) {
        if (!resetToken) {
            throw ApiError.BadRequest("The session has expired, follow the link from the email again.");
        }
        const email = await tokenService.validateResetToken(resetToken).tokenPayload.email;
        const hashPassword = await bcrypt.hash(password, 3);
        await pg("user").update({user_password: hashPassword}).where("email", email);
        return {message: "Password has been successfully changed."};
    }
}

module.exports = new AuthService();