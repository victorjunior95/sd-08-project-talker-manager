const readFile = require('./readFile');
const findPerson = require('./findPerson');
const generatePass = require('./token');
const validations = require('./validations');

module.exports = {
    readFile,
    findPerson,
    generatePass,
    validations,
};
