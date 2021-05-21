const getAllTalkersMiddleware = require('./getAllTalkersMiddleware');
const getTalkerByIdMiddleware = require('./getTalkerByIdMiddleware');
const checkLoginEmailMiddleware = require('./checkLoginEmailMiddleware');
const checkLoginPasswordMiddleware = require('./checkLoginPasswordMiddleware');

module.exports = {
  getAllTalkersMiddleware,
  getTalkerByIdMiddleware,
  checkLoginEmailMiddleware,
  checkLoginPasswordMiddleware,
};