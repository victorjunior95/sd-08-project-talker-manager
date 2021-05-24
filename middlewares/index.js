const login = require('./login');
const { checkName, checkAge, checkWatchedAt, checkTalk } = require('./talker');
const getToken = require('./getToken');

module.exports = {
    login,
    checkName,
    checkAge,
    checkWatchedAt,
    checkTalk,
    getToken,
};