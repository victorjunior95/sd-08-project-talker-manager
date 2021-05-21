const express = require('express');
const rescue = require('express-rescue');
const fs = require('../fs');
const middleware = require('../middlewares');
const createBodyTalker = require('../services/createBodyTalker');

const FILE_PATH = './talker.json';
const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

const talker = express.Router();

talker.get('/', rescue(async (_request, response) => {
  const fileTalkerContent = await fs.readFile(FILE_PATH);

  if (fileTalkerContent) {
    return response.status(OK).json(fileTalkerContent);
  }

  response.status(OK).send([]);
}));

talker.get('/:id', rescue(async (request, response) => {
  const fileTalkerContent = await fs.readFile(FILE_PATH);

  const talkerFound = fileTalkerContent.find(({ id }) => id === Number(request.params.id));

  if (!talkerFound) {
    return response.status(NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  response.status(OK).json(talkerFound);
}));

talker.post('/',
  middleware.authentication,
  middleware.nameValidation,
  middleware.ageValidation,
  middleware.talkValidation,
  middleware.watchedAtValidation,
  middleware.rateValidation,
  rescue(async (request, response) => {
    const fileTalkerContent = await fs.readFile(FILE_PATH);
    const newTalker = createBodyTalker(request.body, fileTalkerContent.length + 1);
    fileTalkerContent.push(newTalker);
    await fs.writeFile(FILE_PATH, fileTalkerContent);
    response.status(CREATED).json(newTalker);
  }));

module.exports = talker;
