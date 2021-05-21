const express = require('express');
const rescue = require('express-rescue');
const fs = require('../fs');

const FILE_PATH = './talker.json';
const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const talker = express.Router();

talker.get('/', rescue(async (_request, response) => {
  const fileTalkerContent = await fs.readFile(FILE_PATH);

  if (fileTalkerContent) {
    return response.status(HTTP_OK_STATUS).json(fileTalkerContent);
  }

  response.status(HTTP_OK_STATUS).send([]);
}));

talker.get('/:id', rescue(async (request, response) => {
  const fileTalkerContent = await fs.readFile(FILE_PATH);

  const talkerFound = fileTalkerContent.find(({ id }) => id === Number(request.params.id));

  if (!talkerFound) {
    return response.status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  response.status(HTTP_OK_STATUS).json(talkerFound);
}));

module.exports = talker;
