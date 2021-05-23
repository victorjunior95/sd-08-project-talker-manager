const error = require('./error');
const getAllPeople = require('./getPeople');
const getPeopleById = require('./getPeopleById');
const { loginThisCorrect, logged, router } = require('./login');

module.exports = {
  error,
  getAllPeople,
  getPeopleById,
  loginThisCorrect,
  logged,
  router,
};