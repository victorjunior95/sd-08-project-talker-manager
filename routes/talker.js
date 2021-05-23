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
  updateTalkerByIdMiddleware,
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

// Requisito 05
router.put('/talker/:id',
checkTokenMiddleware,
  checkNameMiddleware,
  checkAgeMiddleware,
  checkTalkMiddleware,
  checkTalkRateMiddleware,
  checkWatchedAtMiddleware,
  updateTalkerByIdMiddleware,
  addNewTalkerMiddleware);

module.exports = router;
