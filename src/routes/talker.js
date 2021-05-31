const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/', middleware.talker.getAllTalkers);
router.get('/:id', middleware.talker.getTalkerById);

module.exports = router;