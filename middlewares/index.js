const getAllTalkers = require('./getAllTalkers');
const getSingleTalker = require('./getSingleTalker');
const errorMiddleware = require('./errorMiddleware');
const login = require('./login');
const addNewTalker = require('./addNewTalker');
const alterTalker = require('./alterTalker');
const checkToken = require('./checkToken');
const checkName = require('./checkName');
const checkAge = require('./checkAge');
const checkDate = require('./checkDate');
const checkRate = require('./checkRate');
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');
const checkTalk = require('./checkTalk');

module.exports = {
  getAllTalkers,
  getSingleTalker,
  errorMiddleware,
  login,
  addNewTalker,
  alterTalker,
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  deleteTalker,
  searchTalker,
};