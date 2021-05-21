const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const talkersUtils = require('./fs-util');
const authenticate = require('./authentication');

const HTTP_OK_STATUS = 200;

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await talkersUtils.getTalker();

  const talker = talkers.find((person) => person.id === Number(id));

  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talker);
}));

router.get('/', rescue(async (_req, res) => {
  const talker = await talkersUtils.getTalker();

  if (!talker.length) {
    res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).json(talker);
}));

const nameAuth = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } else if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageAuth = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (+age < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkAuth = (req, res, next) => {
  const { talk } = req.body;
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(talk.watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  if (talk.rate < 1 || talk.rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const talkExistAuth = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.rate || !talk.watchedAt) {
    res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  next();
};

const talkerShape = (id, data) => ({
  id,
  name: data.name,
  age: data.age,
  talk: {
    watchedAt: data.talk.watchedAt,
    rate: data.talk.rate,
  },
});

router.post('/', [authenticate.auth, 
  nameAuth,
  ageAuth,
  talkExistAuth,
  talkAuth,
  rescue(async (req, res) => {
  const talker = await talkersUtils.getTalker();

  const newTalker = talkerShape(talker.length + 1, req.body);
  talker.push(newTalker);
  console.log(talker);
  
  await talkersUtils.setTalker(JSON.stringify(talker, null, 2));
  res.status(201).json(newTalker);
})]);

router.delete('/:id',
  authenticate.auth, 
  rescue(async (req, res) => {
  const { id } = req.params;

  const talkers = await talkersUtils.getTalker();
  const talker = talkers.filter((talk) => talk.id !== +id);

  await talkersUtils.setTalker(JSON.stringify(talker, null, 2));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = router;
