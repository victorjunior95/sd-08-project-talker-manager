const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares/talker');

router.get('/', middlewares.getAllTalkers);
router.get('/:id', middlewares.getTalkerById);

module.exports = router;
