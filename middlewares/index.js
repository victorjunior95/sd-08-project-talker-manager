const getAllTalks = require('./getAllTalks');
const getTalkById = require('./getTalkById');
const verifyLogin = require('./verifyLogin');
const verifyToken = require('./verifyToken');
const verifyTalker = require('./verifyTalker');
const addTalk = require('./addTalk');

module.exports = {
  getAllTalks, getTalkById, verifyLogin, verifyToken, verifyTalker, addTalk,
};
