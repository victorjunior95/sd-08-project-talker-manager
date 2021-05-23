const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { kombi } = require('../services');
const { validateToken,
  validateName,
  validateAge,
  validadeTalkKey,
  validadeTalkValues,
} = require('../middleware');

const router = express.Router();

// const app = express();

router.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

router.get('/', (_request, response) => {
  const ops = kombi();
  if (ops.length === 0) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  response.status(HTTP_OK_STATUS).send(ops);
});

router.get('/:id', (req, response) => {
  const ops = kombi();
  const { id } = req.params;
  const person = ops.filter((element) => element.id === Number(id));
  if (person.length === 0) {
    return response.status(404)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(person[0]);
});

router.use(validateToken);
router.use(validateName);
router.use(validateAge);
router.use(validadeTalkKey);
router.use(validadeTalkValues);

router.post('/', (req, res) => {
  const newTalker = req.body;
  const actualTalkers = kombi();
  const newTalkerWithID = { id: actualTalkers.length + 1, ...newTalker };
  actualTalkers.push(newTalkerWithID);

fs.writeFile('./talker.json', JSON.stringify(actualTalkers), (err) => {
  if (err) console.error(err);
});
console.log(newTalkerWithID);
  res.status(201).send(newTalkerWithID);
});

module.exports = router;
