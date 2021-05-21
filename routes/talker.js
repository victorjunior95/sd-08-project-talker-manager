const express = require('express');
const {
  getAllTalkersMiddleware,
  getTalkerByIdMiddleware,
  checkTokenMiddleware,
  checkNewTalkerNameMiddleware,
  checkAgeMiddleware,
} = require('../middlewares');

const router = express.Router();

// Requisito 02
router.get('/talker/:id', getTalkerByIdMiddleware);

// Requisito 01
router.get('/talker', getAllTalkersMiddleware);

// Requisito 04
router.post('/talker',
  checkTokenMiddleware,
  checkNewTalkerNameMiddleware,
  checkAgeMiddleware);

module.exports = router;
