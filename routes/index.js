const express = require('express');
const middlewares = require('../middlewares');
const auth = require('../auth');

const router = express.Router();

router.get('/', middlewares.getAllPeople);

router.get('/:id', middlewares.getPeopleById);

router.post('/', auth, middlewares.createTalker);

router.put('/:id', auth, middlewares.updateTalker);

module.exports = router;
