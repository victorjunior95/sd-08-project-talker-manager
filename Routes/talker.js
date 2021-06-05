const express = require('express');

const getTalker = require('../utils/getAll');
const getById = require('../utils/getById');
const { tokenMiddleware } = require('../middlewares/tokenMiddleware');
const { setNewTalker } = require('../utils/createNewTalker');
const ageMiddleware = require('../middlewares/ageMiddleware');
const nameMiddleware = require('../middlewares/nameMiddleware');
const {
  talkMiddleware,
  rateMiddleware,
  dateMiddleware,
} = require('../middlewares/talkMiddleware');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalker();
  return res.status(200).send(talkers);
});

router.get('/:id', async (_req, res) => {
  const { id } = _req.params;
  const talkerById = await getById(Number(id));
  if (!talkerById) {
    return res
      .status(404)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(talkerById);
});

// router.use();

router.post(
  '/',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  rateMiddleware,
  dateMiddleware,
  async (_req, res) => {
    const newTalker = _req.body;
    const talker = await setNewTalker(newTalker);
    res.status(201).send(talker);
  },
);

module.exports = router;
