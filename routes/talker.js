const express = require('express');
const {
  getAllTalkersMiddleware,
  getTalkerByIdMiddleware,
  checkTokenMiddleware,
  checkNameMiddleware,
  checkAgeMiddleware,
  checkTalkMiddleware,
  checkWatchedAtMiddleware,
  checkTalkRateMiddleware,
  addNewTalkerMiddleware,
} = require('../middlewares');

const router = express.Router();

// Requisito 02
router.get('/talker/:id', getTalkerByIdMiddleware);

// Requisito 01
router.get('/talker', getAllTalkersMiddleware);

// Requisito 04
router.post('/talker',
  checkTokenMiddleware,
  checkNameMiddleware,
  checkAgeMiddleware,
  checkTalkMiddleware,
  checkWatchedAtMiddleware,
  checkTalkRateMiddleware,
  addNewTalkerMiddleware);

module.exports = router;
