const { verifyName, verifyAge, verifyDateAndRate } = require('./verifyTalkerToCreate');
const verifyToken = require('./verifyToken');
const verifyLogin = require('./verifyLogin');

module.exports = {
    verifyName,
    verifyAge,
    verifyToken,
    verifyDateAndRate,
    verifyLogin,
};