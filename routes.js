const express = require('express');

const router = express.Router();

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const createTalker = require('./middlewares/createTalker');
const {
  verifyLogin,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkContent,
} = require('./helper/validation');
// const login = require('./middlewares/login');

router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', verifyLogin);
router.post('/talker',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkContent,
  createTalker);

module.exports = router;
