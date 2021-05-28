const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const rescue = require('express-rescue');
const middlewares = require('../middleware');

router.use(bodyParser.json());

router.get('/', 
rescue(async (_req, res, _next) => {
  const talkers = await middlewares.fsTalkers.getTalker();
  res.status(200).json(talkers);
}));

const findTalkerId = async (req) => {
  const talkers = await middlewares.fsTalkers.getTalker();
  const idParams = parseInt(req.params.id, 10);
  return talkers.find(({ id }) => id === idParams);
};

router.get('/:id', 
rescue(async (req, res, _next) => {
  const talker = await findTalkerId(req);
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
}));

router.post('/', middlewares.validToken, middlewares.validEmptyFields,
middlewares.validTalker, middlewares.validTalk,
rescue(async (req, res, _next) => {
  const talkers = await middlewares.fsTalkers.getTalker();
  const newTalker = req.body;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  await middlewares.fsTalkers.setTalker(talkers);
  res.status(201).json(newTalker);
}));

router.put('/:id', middlewares.validToken, middlewares.validEmptyFields,
middlewares.validTalker, middlewares.validTalk,
  rescue(async (req, res, _next) => {
    const talkerId = parseInt(req.params.id, 10);
    const talkers = await middlewares.fsTalkers.getTalker()
      .then((list) => list
        .map((talkerByList) => {
          if (talkerByList.id === talkerId) return { id: talkerByList.id, ...req.body };
          return talkerByList;
      }));
    await middlewares.fsTalkers.setTalker(talkers);
    const updateTalker = await findTalkerId(req);
    res.status(200).json(updateTalker);
}));

module.exports = router;
