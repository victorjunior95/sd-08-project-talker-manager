const fs = require('fs').promises;

function readFile(filePath) {
  return fs.readFile(filePath, 'utf-8')
    .then((fileContent) => JSON.parse(fileContent))
    .catch((ex) => console.log(ex.message));
}

function writeFile(filePath, newFileTalker) {
  return fs.writeFile(filePath, JSON.stringify(newFileTalker))
    .catch((ex) => console.log(ex.message));
}

module.exports = {
  readFile,
  writeFile,
};
