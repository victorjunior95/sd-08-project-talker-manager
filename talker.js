const express = require('express');
const rescue = require('express-rescue');
const middleware = require('./middlewares');

const router = express.Router();

const getFsTalker = require('./fsFile.js');
const setFsTalker = require('./fsWrite');

router.get('/', async (_req, res) => {
  const content = await getFsTalker();
  // console.log(content);
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

const newUser = (id, data) => ({
  id,
  name: data.name,
  age: data.age,
  talk: {
    watchedAt: data.talk.watchedAt,
    rate: data.talk.rate,
  },
});

router.post('/', [
  middleware.authorization, 
  middleware.name,
  middleware.age,
  middleware.talk,
  middleware.watchedAt,
  middleware.rate,
  async (req, res) => {
    const content = await getFsTalker();
    
    const insertObj = newUser(content.length + 1, req.body); 
      content.push(insertObj);
    await setFsTalker(JSON.stringify(content, null, 2));
    res.status(201).json(insertObj);
  },
]);

router.delete('/:id',
middleware.authorization, 
  rescue(async (req, res) => {
  const { id } = req.params;

  const content = await getFsTalker();
  const deleteTalker = content.filter((talk) => talk.id !== +id);

  await setFsTalker(JSON.stringify(deleteTalker, null, 2));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = router;
