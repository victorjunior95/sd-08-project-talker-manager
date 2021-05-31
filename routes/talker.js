// referencia: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html;
// referencia: Karine Moreira--> https://github.com/ana-karine
const express = require('express');
const fs = require('fs').promises;
const { getToken } = require('../middlewarers/auth');
const { getName } = require('../middlewarers/nameValidateMiddleware');
const { getAge } = require('../middlewarers/ageValidateMiddleware');
const { getTalkField } = require('../middlewarers/talkValidateMiddleware');
const { getData } = require('../middlewarers/dataValidateMiddleware');
const { getRate } = require('../middlewarers/rateValidateMiddleware');

const router = express.Router();

const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const FILE = './talker.json';

router.get('/', async (_request, response) => {
  const file = await fs.readFile(FILE);
  const result = JSON.parse(file.toString('utf-8'));
  response.status(SUCCESS).send(result);
});

router.get('/:id', async (_request, response) => {
  const file = await fs.readFile(FILE);
  const result = JSON.parse(file.toString('utf-8'));
  const res = result.find(({ id }) => id === Number(_request.params.id));
  if (res) {
    return response.status(SUCCESS).json(res);
  }
  response
    .status(NOT_FOUND)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

router.use(getToken);
router.use(getName);
router.use(getAge);
router.use(getTalkField);
router.use(getData);
router.use(getRate);

router.post('/', async (request, response) => {
  const reqbody = request.body;
  const file = await fs.readFile(FILE);
  const result = JSON.parse(file.toString('utf-8'));
  // const result = JSON.parse(file.toString('utf-8'));
  // const file = fs.readFile(`${__dirname}/../talker.json`);
  reqbody.id = result.length + 1;
  result.push(reqbody);
  fs.writeFile(FILE, JSON.stringify(result));
  
  response.status(CREATED).send(reqbody);
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;
  const file = await fs.readFile(FILE);
  const result = JSON.parse(file.toString('utf-8'));
  result[id - 1] = {
    id: Number(id),
    name,
    age: Number(age),
    talk: {
      watchedAt: talk.watchedAt,
      rate: Number(talk.rate),
    },
  };
  console.log(result);
  fs.writeFile(FILE, JSON.stringify(result));
  response.status(SUCCESS).send(result[id - 1]);
});

module.exports = router;
