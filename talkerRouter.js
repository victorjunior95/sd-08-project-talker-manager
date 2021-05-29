const express = require('express');
const testToken = require('./Middlewares/checkToken');
const checkTalker = require('./Middlewares/checkTalker');
const readTalkers = require('./Middlewares/readTalkers');
const writeTalkers = require('./Middlewares/writeTalkers');

let talkers = [];

const router = express.Router();

router.get('/search', async (req, res, next) => {
  await testToken(req.headers.authorization, res);
  // const searched = req.query.q;
  let result = [];
  talkers = await readTalkers(talkers);
  // console.log(talkers);
  if (talkers.length < 1) {
    res.status(200).json(talkers);
    next();
  }
  const regex1 = new RegExp(req.query.q, 'gim');
  for (let i = 0; i < talkers.length; i += 1) {
    if (regex1.test(talkers[i].name)) {
      // console.log(`${talkers[i].name} ${regex1}  ${regex1.test(talkers[i].name)} ${result.length}`);
      result = [...result, talkers[i]];
    }
  }
  res.status(200).json(result);
  next();
});
// https://stackoverflow.com/questions/8517089/js-search-in-object-values

router.post('/', async (req, res, next) => {
  // console.log(`post /${req.body}`);
  testToken(req.headers.authorization, res);
  checkTalker(req, res);
  talkers = await readTalkers(talkers);
  const newId = talkers.length;
  talkers[newId] = { id: newId + 1, ...req.body };
  // console.log(talkers);
  await writeTalkers(talkers);
  res.status(201).json({ id: newId + 1, ...req.body });
  next();
});

router.get('/', async (_req, res, next) => {
  // console.log('get');
  talkers = await readTalkers(talkers);
  res.status(200).json(talkers);
  next();
});

router.delete('/:id', async (req, res, next) => {
  await testToken(req.headers.authorization, res);
  talkers = readTalkers(talkers);
  const editId = Number(req.params.id);
  // console.log(`delete /id typeOf talkers: ${typeof (talkers)} id: ${editId} typeOf id : ${typeof (editId)}`);
  // console.log(talkers.length);
  delete talkers[editId - 1];
  // console.log(talkers.length);
  await writeTalkers(talkers);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  next();
});

router.put('/:id', async (req, res, next) => {
  await testToken(req.headers.authorization, res);
  await checkTalker(req, res);
  talkers = await readTalkers(talkers);
  const editId = Number(req.params.id);
  // console.log(`put /id body: ${req.body} id: ${editId} typeOf id : ${typeof (editId)}`);
  // const talkerId = talkers.find((talker) => talker.id === Number(editId));
  talkers[editId] = { id: editId, ...req.body };
  await writeTalkers(talkers);
  talkers = await readTalkers(talkers);
  // console.log(talkers);
  res.status(200).json({ id: editId, ...req.body });
  next();
});

router.get('/:id', async (req, res, next) => {
  talkers = await readTalkers(talkers);
  const id = Number(req.params.id);
  // console.log(`get /id body: ${req.body} id: ${id} typeOf id : ${typeof (id)}`);
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
     res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    next();
  }
  res.status(200).json(talkerId);
  next();
});

module.exports = router;