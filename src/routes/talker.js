const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/search', middleware.authentication, middleware.talker.searchTalker);
router.get('/', middleware.talker.getAllTalkers);
router.get('/:id', middleware.talker.getTalkerById);
router.post('/', middleware.authentication, middleware.talker.createTalker);
router.put('/:id', middleware.authentication, middleware.talker.editTalker);
router.delete(
  '/:id',
  middleware.authentication,
  middleware.talker.deleteTalker,
);

module.exports = router;
