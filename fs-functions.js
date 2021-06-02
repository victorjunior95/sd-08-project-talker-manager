const fs = require('fs').promises;

const readDataTalkers = () => fs.readFile('./talker.json', 'utf8')
    .then((fileContent) => JSON.parse(fileContent));

const writeDataTalkers = (NewData) => {
    fs.writeFile('./talker.json', JSON.stringify(NewData));
};
module.exports = {
    readDataTalkers,
    writeDataTalkers,
};