const multer = require('multer');
const fs = require('fs');
const tokenService = require('../services/token.service');
const iconv = require('iconv-lite');
const CyrillicToEng = require('cyrillic-to-translit-js');
const cyrillicToEng = new CyrillicToEng();

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
        let bookName = iconv.decode(file.originalname, 'UTF-8').toLowerCase();
        const ext = bookName.match(/\.\w{1,4}$/)[0];
        bookName = bookName.replace(ext, '').replace(/\.|-|,/gm, '');
        bookName = cyrillicToEng.transform(bookName, '-') + ext;
        cb(null, bookName);
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