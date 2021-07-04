const unzipper = require('unzipper');
const fs = require('fs');

class unZipTm {
    async unZipTemplate(el) {
        try {
            fs.createReadStream(`../uploads/files/fdf909e2-4075-4894-a9ad-802c1fc06e28.zip`).pipe(unzipper.Extract({ path: 'output/path' }))
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new unZipTm();