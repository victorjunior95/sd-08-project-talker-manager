const error = require('./error');
const getAllPeople = require('./getPeople');
const getPeopleById = require('./getPeopleById');
const { loginThisCorrect, logged } = require('./login');
const createTalker = require('./createTalker');
const updateTalker = require('./updateTalker');
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');

module.exports = {
  error,
  getAllPeople,
  getPeopleById,
  loginThisCorrect,
  logged,
  createTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
};