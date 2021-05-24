const getAllTalkersMiddleware = require('./getAllTalkersMiddleware');
const getTalkerByIdMiddleware = require('./getTalkerByIdMiddleware');
const checkLoginEmailMiddleware = require('./checkLoginEmailMiddleware');
const checkLoginPasswordMiddleware = require('./checkLoginPasswordMiddleware');
const addNewTalkerMiddleware = require('./addNewTalkerMiddleware');
const checkTokenMiddleware = require('./checkTokenMiddleware');
const checkNameMiddleware = require('./checkNameMiddleware');
const checkAgeMiddleware = require('./checkAgeMiddleware');
const checkTalkMiddleware = require('./checkTalkMiddleware');
const checkWatchedAtMiddleware = require('./checkWatchedAtMiddleware');
const checkTalkRateMiddleware = require('./checkTalkRateMiddleware');
const updateTalkerByIdMiddleware = require('./updateTalkerByIdMiddleware');
const deleteTalkerMiddleware = require('./deleteTalkerMiddleware');
const searchTalkerMiddleware = require('./searchTalkerMiddleware');

module.exports = {
  getAllTalkersMiddleware,
  getTalkerByIdMiddleware,
  checkLoginEmailMiddleware,
  checkLoginPasswordMiddleware,
  checkTokenMiddleware,
  checkNameMiddleware,
  checkAgeMiddleware,
  checkTalkMiddleware,
  checkWatchedAtMiddleware,
  checkTalkRateMiddleware,
  addNewTalkerMiddleware,
  updateTalkerByIdMiddleware,
  deleteTalkerMiddleware,
  searchTalkerMiddleware,
};