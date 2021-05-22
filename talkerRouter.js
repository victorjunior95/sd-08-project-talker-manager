const express = require('express');
const testToken = require('./Middlewares/checkToken');
const checkTalker = require('./Middlewares/checkTalker');
const readTalkers = require('./Middlewares/readTalkers');
const writeTalkers = require('./Middlewares/writeTalkers');

let talkers = [];

const router = express.Router();

router.post('/', (req, res, next) => {
  console.log(`post /${req.body}`);
  testToken(req.headers.authorization, res);
  checkTalker(req, res);
  talkers = readTalkers(talkers);
  const newId = talkers.length + 1;
  talkers[newId] = { id: newId, ...req.body };
  // console.log(talkers);
  writeTalkers(talkers);
  res.status(201).json({ id: newId, ...req.body });
  next();
});

router.get('/', (_req, res, next) => {
  console.log('get');
  talkers = readTalkers(talkers);
  res.status(200).json(talkers);
  next();
});

router.delete('/:id', (req, res, next) => {
  testToken(req.headers.authorization, res);
  talkers = readTalkers(talkers);
  const editId = Number(req.params.id);
  console.log(`delete /id body: ${req.body} id: ${editId} typeOf id : ${typeof (editId)}`);
  console.log(talkers);
  delete talkers[editId];
  console.log(talkers);
  writeTalkers(talkers);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  next();
});

router.put('/:id', (req, res, next) => {
  testToken(req.headers.authorization, res);
  checkTalker(req, res);
  talkers = readTalkers(talkers);
  const editId = Number(req.params.id);
  console.log(`put /id body: ${req.body} id: ${editId} typeOf id : ${typeof (editId)}`);
  // const talkerId = talkers.find((talker) => talker.id === Number(editId));
  // if (!talkerId) {
  //    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  //    next();
  // }
  talkers[editId] = { id: editId, ...req.body };
  writeTalkers(talkers);
  talkers = readTalkers(talkers);
  console.log(talkers);
  res.status(200).json({ id: editId, ...req.body });
  next();
});

router.get('/:id', (req, res, next) => {
  talkers = readTalkers(talkers);
  const id = Number(req.params.id);
  console.log(`put /id body: ${req.body} id: ${id} typeOf id : ${typeof (id)}`);
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
     res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    next();
  }
  res.status(200).json(talkerId);
  next();
});

module.exports = router;