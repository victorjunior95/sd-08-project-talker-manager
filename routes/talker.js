const express = require('express');
const { getAllTalkersMiddleware, getTalkerByIdMiddleware } = require('../middlewares');

const router = express.Router();

// Requisito 02
router.get('/talker/:id', getTalkerByIdMiddleware);

// Requisito 01
router.get('/talker', getAllTalkersMiddleware);

module.exports = router;