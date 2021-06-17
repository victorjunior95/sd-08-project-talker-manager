const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { verifyName, verifyToken, verifyAge, verifyTalk } = require('./auxFunctions');

const { readFile, validateEmail, generateToken } = require('./functions');

app.use(bodyParser.json());

const handleTalkersRequest = (_req, res) => {
  const readFileResponse = readFile();
  return res.status(200).json(readFileResponse);
  // return res.status(404).send(err);
};

const handleSearchForId = (req, res) => {
  const readFileResponse = readFile();
  const talkerFilterById = readFileResponse.filter(
    (talker) => talker.id.toString() === req.params.id,
  )[0];
  console.log(talkerFilterById);
  if (!talkerFilterById) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(talkerFilterById);
};

const numberToComper = 6;
const handleLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < numberToComper) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token: generateToken(16) });
};

const postTalker = (req, res) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;

  const isTokenValid = verifyToken(authorization, res);
  const isNameValid = verifyName(name, res);
  const isAgeValid = verifyAge(age, res);
  const isTalkValid = verifyTalk(talk, res);

  if (isTalkValid) return isTalkValid;
  if (isTokenValid) return isTokenValid;
  if (isNameValid) return isNameValid;
  if (isAgeValid) return isAgeValid;
  return res.status(201).json({
    id: 1,
    name: 'Danielle Santos',
    age: 56,
    talk: {
      watchedAt: '22/10/2019',
      rate: 5,
    },
  });
};

module.exports = {
  handleTalkersRequest,
  handleSearchForId,
  handleLogin,
  postTalker,
};
