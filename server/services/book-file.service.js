const fs = require('fs');
const pdfParser = require('pdf-parse');
const pdf2img = require("pdf-img-convert");
const iconv = require("iconv-lite");
const CyrillicToEng = require('cyrillic-to-translit-js');
const cyrillicToEng = new CyrillicToEng();

class FileService {
    async getPdfMetaData(file) {
        const pdfBuffer = fs.readFileSync(file.path);
        return pdfParser(pdfBuffer)
            .then(({info, numpages}) => {
                return {pages: numpages, title: info.Title, author: info.Author};
            })
            .catch((err) => {
                console.log(err);
            });
    }
    async getPdfThumbnail(filepath, originalName, userId) {
        const pdfArray = await pdf2img.convert(filepath, {page_numbers: [1]});
        const fileName = originalName.replace(/\.\w{1,4}$/, '') + ".png";
        const path = `data/user${userId}/images/${fileName}`;
        console.log(`Saving ${filepath} book image...`);
        fs.writeFile(path, pdfArray[0], (error) => error && console.error(`Error: ${error}`));
        return path;
    }
    getPdfFileName(originalName) {
        let bookName = iconv.decode(originalName, 'UTF-8').toLowerCase();
        const ext = bookName.match(/\.\w{1,4}$/)[0];
        bookName = bookName.replace(ext, '').replace(/\.|-|,/gm, '');
        bookName = cyrillicToEng.transform(bookName, '-');
        return [bookName, ext];
    }
}

module.exports = new FileService();