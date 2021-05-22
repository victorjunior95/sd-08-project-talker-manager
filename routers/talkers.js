const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('../services');

const router = express.Router();

// const app = express();

router.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

router.get('/', (_request, response) => {
  const ops = talkers.kombi();
  if (ops.length === 0) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  response.status(HTTP_OK_STATUS).send(ops);
});

router.get('/:id', (req, response) => {
  const ops = talkers.kombi();
  const { id } = req.params;
  const person = ops.filter((element) => element.id === Number(id));
  if (person.length === 0) {
    return response.status(404)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(person[0]);
});

module.exports = router;
