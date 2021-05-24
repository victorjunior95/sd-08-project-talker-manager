const express = require('express');

const router = express.Router();
const middlewares = require('../../middlewares');

router.get('/', middlewares.talker.getAll);
router.get('/:id', middlewares.talker.getById);

module.exports = router;
