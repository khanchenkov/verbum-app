const fs = require('fs');
const multer = require('multer');
const tokenService = require('../services/token.service');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const userId = tokenService.validateRefreshToken(req.cookies.refreshToken).tokenPayload.id;
        const directory = `data/user${userId}`;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true })
        }
        cb(null, directory);
    },
    filename(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = `user-image.${ext}`;
        cb(null, filename);
    }
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];
const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({storage, fileFilter});