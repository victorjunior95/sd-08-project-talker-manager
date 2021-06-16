const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/talker')

router.get('/', middlewares.getAllTalkers);

module.exports = router;
