const {validationResult} = require("express-validator");
const authService = require("../services/auth.service");
const ApiError = require("../exceptions/api.error");
const CLIENT_URL = process.env.PRODUCTION === "true" ? process.env.DEPLOY_CLIENT_URL : process.env.LOCAL_CLIENT_URL;

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }
            const {email, password} = req.body;
            const userData = await authService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
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
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

//     async refresh(req, res, next) {
//         try {
//             const {refreshToken} = req.cookies;
//             const userData = await authService.refresh(refreshToken);
//             res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
//             return res.json(userData);
//         } catch (e) {
//             next(e);
//         }
//     }
//     async forgot(req, res, next) {
//         try {
//             const {email} = req.body;
//             await authService.forgot(email);
//             return res.send({message: "Ссылка успешно отправлена."})
//         } catch (e) {
//             next(e);
//         }
//     }
//     async resetCheck(req, res, next) {
//         try {
//             const resetLink = req.params.link;
//             const {link, userData} = await authService.resetCheck(resetLink);
//             res.cookie('resetToken', userData.resetToken, {maxAge: 60 * 60 * 1000, httpOnly: true});
//             return res.redirect(`${CLIENT_URL}/reset/${link}`);
//         } catch (e) {
//             next(e);
//         }
//     }
//     async checkLink(req, res, next) {
//         try {
//             const link = req.body.link;
//             const resetToken = req.cookies.resetToken;
//             const isValidLink = await authService.checkLink(link, resetToken);
//             return res.json(isValidLink);
//         } catch (e) {
//             next(e);
//         }
//     }
//     async reset(req, res, next) {
//         try {
//             const {resetToken} = req.cookies;
//             const {password} = req.body;
//             const errors = validationResult(req);
//             console.log(password);
//             console.log(errors);
//             if (!errors.isEmpty()) {
//                 return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
//             }
//             const resetMessage = await authService.reset(resetToken, password);
//             res.clearCookie('resetToken');
//             res.json(resetMessage);
//         } catch (e) {
//             next(e);
//         }
//     }
}

module.exports = new AuthController();