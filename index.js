const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const randtoken = require('rand-token');
const validateDate = require('validate-date');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER_ARC = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('deu certo');
});

// req 01

app.get('/talker', (_request, response) => {
  const readAllTalkers = fs.readFileSync(TALKER_ARC, 'utf8');

  const talkers = readAllTalkers ? JSON.parse(readAllTalkers) : null;

  if (!talkers) return response.status(HTTP_OK_STATUS).send({});
  return response.status(HTTP_OK_STATUS).send(talkers);
});

// req 02

app.get('/talker/:id', (request, response) => {
  const readAllTalkers = fs.readFileSync(TALKER_ARC, 'utf8');

  const talkers = readAllTalkers ? JSON.parse(readAllTalkers) : null;
  const talker = talkers.find((talke) => talke.id === Number(request.params.id));

  if (!talker) return response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  return response.status(HTTP_OK_STATUS).send(talker);
});

// req 03
// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
// https://www.npmjs.com/package/rand-token

function validateInformation(email, password) {
  const regexEmail = /\S+@\S+\.\S+/;
  if (!email) return 'O campo "email" é obrigatório';
  if (!password) return 'O campo "password" é obrigatório';
  if (password.toString().length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
 const validEmail = regexEmail.test(email);
 if (!validEmail) return 'O "email" deve ter o formato "email@email.com"';
 return false;
}

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const verifyInformation = validateInformation(email, password);

  if (verifyInformation) return response.status(400).send({ message: verifyInformation });
  const token = randtoken.generate(16);
  response.status(HTTP_OK_STATUS).send({ token });
});

// req 04
function verifyToken(request, response, next) {
  const { headers: { authorization } } = request;
  if (!authorization) return response.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return response.status(401).send({ message: 'Token inválido' });
  next();
}

function verifyNameAndAge(request, response, next) {
  const { name, age } = request.body;
  if (!name) return response.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
 return response.status(400)
  .send({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
  if (!age) return response.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
 return response.status(400)
  .send({ message: 'A pessoa palestrante deve ser maior de idade' }); 
}
  next();
}

// https://www.npmjs.com/package/validate-date
const isValidDate = (date) => {
  if (date.includes('-')) return false;
  return validateDate(date, 'boolean', 'dd/mm/yyyy');
};

const verifyRateValueAndFormat = (rate) => {
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) return false;
  return true;
};

function verifyTalkCamp(request, response, next) {
  const { talk: { watchedAt, rate } } = request.body;
  const validDate = isValidDate(watchedAt);
  if (!validDate) {
 return response.status(400)
  .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
  const isValidRate = verifyRateValueAndFormat(rate);
  if (!isValidRate) {
 return response.status(400)
  .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
}
  next();
}

function verifyTalkExist(request, response, next) {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) { 
    return response.status(400)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
  }
  next();
}

const addIdToTalk = (talkers, body) => {
  const maxId = talkers.reduce((acc, curr) => {
    if (curr.id > acc) return curr.id;
    return acc;
  }, 0);
  const newTalker = {
    id: maxId + 1,
    ...body,
  };
  return newTalker;
};

app.post('/talker', verifyToken, verifyNameAndAge, verifyTalkCamp,
verifyTalkExist, (request, response) => {
  const { body } = request;
  const readAllTalkers = JSON.parse(fs.readFileSync(TALKER_ARC, 'utf8'));
  const incrementIdToTalker = addIdToTalk(readAllTalkers, body);
  const addTalkes = [...readAllTalkers, incrementIdToTalker];
  fs.writeFileSync(TALKER_ARC, JSON.stringify(addTalkes, null, '\t'));
  return response.status(201).send(incrementIdToTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});

// req 05

// req 06

// req 07