const fs = require('fs');
const pdfParser = require('pdf-parse');

class FileService {
    async getMetaData(file) {
        const pdfBuffer = fs.readFileSync(file.path);
        return pdfParser(pdfBuffer)
            .then(({info, numpages}) => {
                return {pages: numpages, title: info.Title, author: info.Author};
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = new FileService();