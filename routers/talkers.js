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

function updateFile(newData) {
  fs.writeFile('./talker.json', JSON.stringify(newData), (err) => {
    if (err) console.error(err);
  });
}

router.get('/', (_request, response) => {
  const ops = kombi();
  if (ops.length === 0) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  response.status(HTTP_OK_STATUS).send(ops);
});

router.get('/search', validateToken, (req, res) => {
  // console.log(req.query.q);
  const { q } = req.query;
  const actualTalkers = kombi();
  const talkerFound = actualTalkers
  .filter((each) => each.name.toLowerCase()
  .includes(q.toLowerCase()));
  res.status(200).send(talkerFound);
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

router.delete('/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  const actualTalkers = kombi();
  const modifiedTalkers = actualTalkers.filter((each) => each.id !== id);
  // console.log(modifiedTalkers);
  updateFile(modifiedTalkers);
  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(validateName);
router.use(validateAge);
router.use(validadeTalkKey);
router.use(validadeTalkValues);

router.post('/', (req, res) => {
  const newTalker = req.body;
  const actualTalkers = kombi();
  const newTalkerWithID = { id: actualTalkers.length + 1, ...newTalker };
  actualTalkers.push(newTalkerWithID);
updateFile(actualTalkers);
  res.status(201).send(newTalkerWithID);
});

router.put('/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  const newTalkerInfo = req.body;
  const actualTalkers = kombi();
  const talkerToEdit = actualTalkers.map((each) => {
    if (each.id === Number(id)) {
      return { ...each,
        name: newTalkerInfo.name,
        age: newTalkerInfo.age,
        talk: {
          watchedAt: newTalkerInfo.talk.watchedAt,
          rate: newTalkerInfo.talk.rate,
        },
      };
    } return each;
  });
  updateFile(talkerToEdit);
  res.status(200).send({ id, ...newTalkerInfo });
});

module.exports = router;
