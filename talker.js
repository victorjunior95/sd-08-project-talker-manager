const express = require('express');

const router = express.Router();

const getFsTalker = require('./fsFile.js');

router.get('/', async (_req, res) => {
  const content = await getFsTalker();
  console.log(content);
  if (!content) {
    return res.status(401);
  }
  return res.status(200).json(content);
});

router.get('/:id', async (req, res) => {
  let content = await getFsTalker();
  const { id } = req.params;
  if (!content.some((cont) => cont.id === +id)) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  content = content.find((c) => c.id === +id);
  res.status(200).json(content);
});

module.exports = router;
