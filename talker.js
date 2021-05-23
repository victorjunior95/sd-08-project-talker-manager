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
// a ordem das rotas estava alterando resultado, sendo assim tive que subir com o /search)
router.get('/search', middleware.authorization, rescue(async (req, res) => {
  const { name } = req.params;
// req body x req params
// https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
  const content = await getFsTalker();
  if (!name) {
    res.status(200).json(content);
  }
  // O método includes() determina se um array/objeto contém um determinado elemento ou não, 
  // retornando true ou false , respectivamente. Em outras palavras, includes() retornará true se 
  // o elemento existir no array/objeto.
  const newTalker = content.filter((ppl) => ppl.name.includes(content));
  res.status(200).json(newTalker);
})); 

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
  // o + converte o id em numero, pq ele vem como string, mesma função que o Number()

  await setFsTalker(JSON.stringify(deleteTalker, null, 2));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = router;
