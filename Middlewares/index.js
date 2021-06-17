const createTalker = require('./createTalker');
const deleteTalker = require('./deleteTalker');
const editTalker = require('./editTalker');
const getTalkersData = require('./getTalkersData');
const readData = require('./readData');
const searchTalkerById = require('./searchTalkerById');
const searchTalkerByName = require('./searchTalkerByName');
const updateToken = require('./updateToken');

module.exports = {
  createTalker,
  deleteTalker,
  editTalker,
  getTalkersData,
  searchTalkerById,
  readData,
  searchTalkerByName,
  updateToken,
};
