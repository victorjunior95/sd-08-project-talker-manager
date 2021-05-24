const express = require('express');
const middlewares = require('../middlewares');
const auth = require('../auth');

const router = express.Router();

router.get('/search', auth, middlewares.searchTalker);

router.get('/:id', middlewares.getPeopleById);

router.get('/', middlewares.getAllPeople);

router.post('/', auth, middlewares.createTalker);

router.put('/:id', auth, middlewares.updateTalker);

router.delete('/:id', auth, middlewares.deleteTalker);

module.exports = router;
