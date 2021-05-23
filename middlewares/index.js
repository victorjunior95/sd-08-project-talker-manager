const error = require('./error');
const getAllPeople = require('./getPeople');
const getPeopleById = require('./getPeopleById');
const { loginThisCorrect, logged } = require('./login');

module.exports = {
  error,
  getAllPeople,
  getPeopleById,
  loginThisCorrect,
  logged,
};