const express = require('express');
const {
  getAllTalkersMiddleware,
  getTalkerByIdMiddleware,
  addNewTalkerMiddleware,
} = require('../middlewares');

const router = express.Router();

// Requisito 02
router.get('/talker/:id', getTalkerByIdMiddleware);

// Requisito 01
router.get('/talker', getAllTalkersMiddleware);

// Requisito 04
router.post('/talker', addNewTalkerMiddleware);

module.exports = router;
