const express = require('express');

const getTalker = require('../utils/getAll');
const getById = require('../utils/getById');

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

module.exports = router;
