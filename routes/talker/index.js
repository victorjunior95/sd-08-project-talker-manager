const express = require('express');

const router = express.Router();
const middlewares = require('../../middlewares');

router.get('/', middlewares.talker.getAll);

router.get('/:id', middlewares.talker.getById);

router.post('/', middlewares.auth, middlewares.talker.addTalker);

router.put('/:id', middlewares.auth, middlewares.talker.putById);

module.exports = router;
