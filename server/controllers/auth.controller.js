const {validationResult} = require("express-validator");
const authService = require("../services/auth.service");
const ApiError = require("../exceptions/api.error");
const CLIENT_URL = process.env.PRODUCTION === "true" ? process.env.DEPLOY_CLIENT_URL : process.env.LOCAL_CLIENT_URL;

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Email or password is invalid.", errors.array()));
            }
            const {email, password} = req.body;
            const userData = await authService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async sendActivationLink(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(refreshToken)
            await authService.sendActivationLink(refreshToken);
            return res.json({message: "Link was successfully sent."});
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await authService.activate(activationLink);
            return res.redirect(CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.clearCookie('resetToken');
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json({message: "You successfully logged out."});
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async forgot(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Email is invalid.", errors.array()));
            }
            const email = req.body.email;
            await authService.forgot(email);
            return res.send({message: "Link was successfully sent. Check spam folder also."})
        } catch (e) {
            next(e);
        }
    }
    async setResetToken(req, res, next) {
        try {
            const resetLink = req.params.link;
            const {link, resetToken} = await authService.checkResetLink(resetLink);
            res.cookie('resetToken', resetToken, {maxAge: 60 * 60 * 1000, httpOnly: true});
            return res.redirect(`${CLIENT_URL}/reset/${link}`);
        } catch (e) {
            next(e);
        }
    }
    async checkResetLink(req, res, next) {
        try {
            const resetLink = req.body.link;
            const resetToken = req.cookies.resetToken;
            const isLinkValid = await authService.checkResetToken(resetLink, resetToken);
            return res.json(isLinkValid);
        } catch (e) {
            next(e);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const {resetToken} = req.cookies;
            const {password} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Password is invalid.", errors.array()));
            }
            const resetMessage = await authService.resetPassword(resetToken, password);
            res.clearCookie('resetToken');
            res.json(resetMessage);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();