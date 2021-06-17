const { verifyName, verifyAge, verifyDateAndRate } = require('./verifyTalkerToCreate');
const verifyToken = require('./verifyToken');
const verifyLogin = require('./verifyLogin');
const { readFile, writeIntoFile } = require('./readAndWrite');

module.exports = {
    verifyName,
    verifyAge,
    verifyToken,
    verifyDateAndRate,
    verifyLogin,
    readFile,
    writeIntoFile,
};