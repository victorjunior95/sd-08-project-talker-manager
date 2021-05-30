const getAllTalks = require('./getAllTalks');
const getTalkById = require('./getTalkById');
const verifyLogin = require('./verifyLogin');
const verifyToken = require('./verifyToken');
const verifyTalker = require('./verifyTalker');
const addTalk = require('./addTalk');
const editTalk = require('./editTalk');
const deleteTalk = require('./deleteTalk');

module.exports = {
  getAllTalks, getTalkById, verifyLogin, verifyToken, verifyTalker, addTalk, editTalk, deleteTalk,
};
