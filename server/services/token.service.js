const jwt = require("jsonwebtoken");
const pg = require("../database/database");
const deviceService = require("./device.service");
const UserDto = require("../dtos/user.dto");

class TokenService{
    async saveGeneratedTokens(user) {
        const tokenPayload = new UserDto(user);
        const tokens = this.generateTokens({tokenPayload});
        const userDevice = await deviceService.detectUniqueMachine();
        await this.saveToken(user.id, userDevice, tokens.refreshToken);
        return {...tokens, user: tokenPayload};
    }
    async saveToken(userId, userDevice, refreshToken) {
        const [token] = await pg("token")
            .where({ user_id: userId, user_device: userDevice })
            .select("*");
        if (token) {
            await pg("token")
                .where("user_id", userId)
                .update({user_device: userDevice, refresh_token: refreshToken})
            return undefined;
        }
        await pg("token").insert({user_id: userId, user_device: userDevice, refresh_token: refreshToken})
    }
    async removeToken(refreshToken) {
        await pg("token").where("refresh_token", refreshToken).del();
    }
    async findToken(refreshToken) {
        const [token] = await pg("token").select("refresh_token").where("refresh_token", refreshToken);
        return token;
    }
    generateResetToken(user) {
        const tokenPayload = new UserDto(user);
        return jwt.sign({tokenPayload}, process.env.JWT_RESET_TOKEN, {expiresIn: '1h'});
    }
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
        return { accessToken, refreshToken }
    }
    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
        } catch (e) {
            return null;
        }
    }
    validateResetToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_RESET_TOKEN);
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();