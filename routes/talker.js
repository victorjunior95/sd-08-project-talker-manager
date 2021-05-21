const express = require('express');
const rescue = require('express-rescue');
const fs = require('../fs');

const FILE_PATH = './talker.json';
const HTTP_OK_STATUS = 200;

const talker = express.Router();

talker.get('/', rescue(async (_request, response) => {
  const fileTalkerContent = await fs.readFile(FILE_PATH);

  if (fileTalkerContent) {
    return response.status(HTTP_OK_STATUS).json(fileTalkerContent);
  }

  response.status(HTTP_OK_STATUS).send([]);
}));

module.exports = talker;
