const fs = require('fs');

const readSync = (path) => JSON.parse(fs.readFileSync(path));

module.exports = readSync;
