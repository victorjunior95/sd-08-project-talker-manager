const fs = require('fs');

function readFile(fileName) {
    try {
        return fs.readFileSync(fileName, 'utf-8');
    } catch (error) {
        return error.message;
    }
}

module.exports = readFile;