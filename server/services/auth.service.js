const bcrypt = require("bcrypt");
const uuid = require("uuid");
const pg = require("../database/database");
const ApiError = require("../exceptions/api.error");
const mailService = require("../services/mail.service");
const tokenService = require("../services/token.service");
const API_URL = process.env.PRODUCTION === "true" ? process.env.DEPLOY_API_URL : process.env.LOCAL_API_URL;

class AuthService {
    async registration(email, password) {
        const [candidate] = await pg("user").select("id").where("email", email);
        if (candidate) {
            throw ApiError.BadRequest("Пользователь с таким email уже существует.");
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
    }
    async login(email, password) {
        const [user] = await pg("user").select("*").where("email", email);
        if (!user) {
            throw ApiError.BadRequest("Пароль или email введены некорректно");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.user_password);
        if (!isPasswordCorrect) {
            throw ApiError.BadRequest("Пароль или email введены некорректно");
        }
        return tokenService.saveGeneratedTokens(user);
    }
    async logout(refreshToken) {
        return tokenService.removeToken(refreshToken);
    }
}


module.exports = new AuthService();