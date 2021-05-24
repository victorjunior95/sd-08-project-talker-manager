const registertalker = require('./registertalker');
const talkerid = require('./talkerid');
const login = require('./login');
const verifyAutho = require('./verifyauthorization');
const verifyName = require('./verifyname');
const verifyAge = require('./verifyage');
const verifyTalkOne = require('./verifytalkone');
const verifyTalkTwo = require('./verifytalktwo');
const createTalker = require('./createtalker');
const changeTalker = require('./changetalkerid');

module.exports = {
  registertalker,
  talkerid,
  login,
  createTalker,
  verifyAutho,
  verifyName,
  verifyAge,
  verifyTalkOne,
  verifyTalkTwo,
  changeTalker,
};
