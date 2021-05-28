const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const rescue = require('express-rescue');
const fs = require('fs').promises;

function getTalker() {
  return fs.readFile('./talker.json', 'utf-8')
  .then((file) => JSON.parse(file));
}

function setTalker(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

// Crie o endpoint POST /login

const validateEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)/;
  return emailRegex.test(email);
};

const validatePassword = (password) => (password.length >= 6);

const generateToken = () => crypto.randomBytes(8).toString('hex');

app.post('/login', rescue((req, res) => {
  const { body } = req;
  if (!body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!validateEmail(body.email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } if (!body.password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  } if (!validatePassword(body.password)) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  return res.status(200).json({ token: generateToken(),
  });
}));

// Crie o endpoint POST /talker

const verifyRate = (rate) => (Number.isInteger(rate) && rate >= 1 && rate <= 5);

const verifyWatchedAt = (WatchedAt) => {
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return dateRegex.test(WatchedAt);
};

const checkTalkChields = (req, res) => {
  const { talk } = req.body;
  if (!talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  } if (!verifyRate(talk.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } if (!verifyWatchedAt(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const checkTalk = (req, res) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  return checkTalkChields(req, res);
};

const verifyAge = (age) => (Number(age) >= 18);

const checkAge = (req, res) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (!verifyAge(age)) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return checkTalk(req, res);
};

const verifyName = (name) => (name.length >= 3);

const checkName = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (verifyName(name) === false) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return checkAge(req, res);
};

const verifyToken = (token) => {
  const tokenRegex = /^(\d|\w){16}$/gm;
  return tokenRegex.test(token);
};

const checkToken = (req, res, callback) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (!verifyToken(authorization)) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (callback) {
    callback(req, res);
  }
};

const addTalker = async (req, res) => {
  const { body } = req;
  const talkers = await getTalker();
  const id = talkers.length + 1;
  const newTalker = { ...body, id };
  talkers.push(newTalker);
  await setTalker(talkers);
  return res.status(201).json(newTalker);
};

app.post('/talker', rescue(async (req, res) => {
  checkToken(req, res, checkName);
  const end = await addTalker(req, res);
  return end;
}));

// Crie o endpoint PUT /talker/:id

const updateTalker = async (req, res) => {
  const idParam = Number(req.params.id);
  const { name, age, talk } = req.body;
  const talkers = await getTalker();
  const talkersFiltered = talkers.filter((talker) => talker.id !== idParam);
  const newTalkers = [...talkersFiltered, { id: idParam, name, age, talk }];
  await setTalker(newTalkers);
  return res.status(200).json({ id: idParam, name, age, talk });
};

app.put('/talker/:id', rescue(async (req, res) => {
  checkToken(req, res, checkName);
  const end = await updateTalker(req, res);
  return end;
}));

// Crie o endpoint DELETE /talker/:id

app.delete('/talker/:id', rescue(async (req, res) => {
  checkToken(req, res);
  const idParam = Number(req.params.id);
  const talkers = await getTalker();
  const talkersFiltered = talkers.filter((talker) => talker.id !== idParam);
  await setTalker(talkersFiltered);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

// Crie o endpoint GET /talker/:id

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const talkers = await getTalker();

    const talker = talkers.find((ObjTalker) => ObjTalker.id === Number(req.params.id));

    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
  }),
);

// 1 - Crie o endpoint GET /talker
app.get('/talker', rescue(async (_req, res) => {
  const talkers = await getTalker();
  res.status(200).json(talkers);
}));