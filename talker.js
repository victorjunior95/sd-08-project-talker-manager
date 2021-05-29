// reference: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html
const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const SUCCESS = 200;
const NOT_FOUND = 404;

router.get('/', async (_request, response) => {
  const file = await fs.readFile('./talker.json');
  const result = JSON.parse(file.toString('utf-8'));
  response.status(SUCCESS).send(result);
});

router.get('/:id', async (_request, response) => {
  const file = await fs.readFile('./talker.json');
  const result = JSON.parse(file.toString('utf-8'));
  const res = result.find(({ id }) => id === Number(_request.params.id));
  if (res) {
    return response.status(SUCCESS).json(res);
  }
   response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
});
module.exports = router;
