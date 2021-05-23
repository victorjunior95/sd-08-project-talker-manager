const getAllTalkers = require('./getAllTalkers');
const getSingleTalker = require('./getSingleTalker');
const errorMiddleware = require('./errorMiddleware');
const login = require('./login');
const addNewTalker = require('./addNewTalker');

module.exports = {
  getAllTalkers,
  getSingleTalker,
  errorMiddleware,
  login,
  addNewTalker,
};