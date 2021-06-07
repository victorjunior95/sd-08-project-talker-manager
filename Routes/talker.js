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
} = require('../middlewares/talkMiddleware');
const editTalker = require('../utils/editTalker');
const deleteTalker = require('../utils/deleteTalker');
const searchByQuery = require('../utils/searchByQuery');

const router = express.Router();

router.get('/search', tokenMiddleware, async (_req, res) => {
  const search = _req.query.q;
  const response = await searchByQuery(search);

  return res.status(200).send(response);
});

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

router.post(
  '/',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  rateMiddleware,
  async (_req, res) => {
    const newTalker = _req.body;
    const talker = await setNewTalker(newTalker);
    res.status(201).send(talker);
  },
);

router.put(
  '/:id',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  rateMiddleware,

  async (_req, res) => {
    const { id } = _req.params;
    const newTalker = _req.body;
    const editedTalker = await editTalker(Number(id), newTalker);

    res.status(200).send(editedTalker);
  },
);

router.delete('/:id', tokenMiddleware, async (_req, res) => {
  const { id } = _req.params;
  await deleteTalker(Number(id));
  return res
    .status(200)
    .send({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
