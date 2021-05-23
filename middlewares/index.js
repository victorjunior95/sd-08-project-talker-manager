const getAllTalkers = require('./getAllTalkers');
const getSingleTalker = require('./getSingleTalker');
const errorMiddleware = require('./errorMiddleware');
const login = require('./login');

module.exports = {
  getAllTalkers,
  getSingleTalker,
  errorMiddleware,
  login,
};