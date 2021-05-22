const express = require('express');

const router = express.Router();

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const verifyLogin = require('./helper/validation');
// const login = require('./middlewares/login');

router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', verifyLogin);

module.exports = router;
