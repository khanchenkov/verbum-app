const multer = require('multer');
const fs = require('fs');
const tokenService = require('../services/token.service');
const bookFileService = require("../services/book-file.service");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const userId = tokenService.validateRefreshToken(req.cookies.refreshToken).tokenPayload.id;
        const directory = `data/user${userId}/books`;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true })
        }
        cb(null, directory);
    },
    filename(req, file, cb) {
        const [bookName, ext] = bookFileService.getPdfFileName(file.originalname);
        cb(null, bookName + ext);
    }
});

const types = ['application/pdf', 'application/epub+zip'];
const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({storage, fileFilter});