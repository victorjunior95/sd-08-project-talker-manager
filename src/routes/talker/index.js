const express = require('express');
const middleware = require('../../middleware');

const router = express.Router();

router.get('/', middleware.talker.getAllTalker);
router.get('/:id', middleware.talker.getTalkerById);
module.exports = router;