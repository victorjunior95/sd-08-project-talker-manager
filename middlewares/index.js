const getAllTalkersMiddleware = require('./getAllTalkersMiddleware');
const getTalkerByIdMiddleware = require('./getTalkerByIdMiddleware');
const checkLoginEmailMiddleware = require('./checkLoginEmailMiddleware');
const checkLoginPasswordMiddleware = require('./checkLoginPasswordMiddleware');
const addNewTalkerMiddleware = require('./addNewTalkerMiddleware');

module.exports = {
  getAllTalkersMiddleware,
  getTalkerByIdMiddleware,
  checkLoginEmailMiddleware,
  checkLoginPasswordMiddleware,
  addNewTalkerMiddleware,
};