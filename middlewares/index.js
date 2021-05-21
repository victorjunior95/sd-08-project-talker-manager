const talkers = require('./talkers');
const talkerById = require('./talkerById');
const auth = require('./authorization');
const addTalker = require('./addTalker');
const verifyToken = require('./verifyToken');
const verifyBodyName = require('./verifyBodyName');
const verifyBodyAge = require('./verifyBodyAge');
const verifyBodyTalk = require('./verifyBodyTalk');
const verifyBodyTalkKeys = require('./verifyBodyTalkKeys');
const editTalkerById = require('./editTalkerById');
const deleteTalkerById = require('./deleteTalkerById');
const searchTalkers = require('./searchTalkers');

module.exports = {
  talkers,
  talkerById,
  auth,
  verifyToken,
  verifyBodyName,
  verifyBodyAge,
  verifyBodyTalk,
  verifyBodyTalkKeys,
  addTalker,
  editTalkerById,
  deleteTalkerById,
  searchTalkers,
};
