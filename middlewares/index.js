const error = require('./error');
const getAllPeople = require('./getPeople');
const getPeopleById = require('./getPeopleById');
const { loginThisCorrect, logged } = require('./login');
const createTalker = require('./createTalker');
const updateTalker = require('./updateTalker');

module.exports = {
  error,
  getAllPeople,
  getPeopleById,
  loginThisCorrect,
  logged,
  createTalker,
  updateTalker,
};