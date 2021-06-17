const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
  verifyName,
  verifyToken,
  verifyAge,
  verifyDateAndRate,
  verifyLogin,
} = require('./auxFunctions');

const { readFile } = require('./readAndWrite');

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
  if (!talkerFilterById) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(talkerFilterById);
};

const handleLogin = (req, res) => {
  const { email, password } = req.body;
  verifyLogin(email, password, res);
};

const postTalker = (req, res) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;

  const isTokenValid = verifyToken(authorization, res);
  const isNameValid = verifyName(name, res);
  const isAgeValid = verifyAge(age, res);
  const isTalkValid = verifyDateAndRate(talk, res);

  if (isTalkValid) return isTalkValid;
  if (isTokenValid) return isTokenValid;
  if (isNameValid) return isNameValid;
  if (isAgeValid) return isAgeValid;
  return res.status(201).json();
};

module.exports = {
  handleTalkersRequest,
  handleSearchForId,
  handleLogin,
  postTalker,
};
