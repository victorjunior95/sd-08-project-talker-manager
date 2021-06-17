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

// req 07
function verifyToken(request, response, next) {
  const { headers: { authorization } } = request;
  if (!authorization) return response.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return response.status(401).send({ message: 'Token inválido' });
  next();
}

function findTalkersByName(allTalkers, talkerName) {
  const find = allTalkers.filter((e) => e.name.toLowerCase().includes(talkerName.toLowerCase()));
 return find;
}

app.get(
  '/talker/search',
  verifyToken,
  (request, response) => {
    const allTalkers = JSON.parse(fs.readFileSync(TALKER_ARC, 'utf8'));
    if (request.query.q) {
      const talkersByName = findTalkersByName(allTalkers, request.query.q);
      return response.status(HTTP_OK_STATUS).send(talkersByName);
    }
    return response.status(HTTP_OK_STATUS).send(allTalkers);
  },
);

// req 01

app.get('/talker', (_request, response) => {
  const readAllTalkers = fs.readFileSync(TALKER_ARC, 'utf8');

  const talkers = readAllTalkers ? JSON.parse(readAllTalkers) : null;

  if (!talkers) return response.status(HTTP_OK_STATUS).send({});
  return response.status(HTTP_OK_STATUS).send(talkers);
});

// req 02
function findByID(talkers, id) {
  return talkers.find((talke) => talke.id === Number(id));
}

app.get('/talker/:id', (request, response) => {
  const readAllTalkers = fs.readFileSync(TALKER_ARC, 'utf8');

  const talkers = readAllTalkers ? JSON.parse(readAllTalkers) : null;
  const talker = findByID(talkers, request.params.id);

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

function verifyTalkCamp(request, response, next) {
  const { talk: { watchedAt, rate } } = request.body;
  const validDate = isValidDate(watchedAt);
  if (!validDate) {
 return response.status(400)
  .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
  
  if (!Number.isInteger(rate, 10) || parseInt(rate, 10) < 1 || parseInt(rate, 10) > 5) {
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

app.post(
  '/talker',
  verifyToken,
  verifyNameAndAge,
  verifyTalkCamp,
  verifyTalkExist,
(request, response) => {
  try {
  const newTalker = request.body;
  const readAllTalkers = JSON.parse(fs.readFileSync(TALKER_ARC, 'utf8'));
  newTalker.id = readAllTalkers.length + 1;
  readAllTalkers.push(newTalker);
  fs.writeFileSync(TALKER_ARC, JSON.stringify(readAllTalkers));
  return response.status(201).send(newTalker); 
} catch (err) {
  response.status(400).send({ err });
}
},
);

// req 05

app.put(
  '/talker/:id',
  verifyToken,
  verifyNameAndAge,
  verifyTalkCamp,
  verifyTalkExist,
   (request, response) => {
    try {
      const newId = parseInt(request.params.id, 10);
      const newTalker = request.body;
      newTalker.id = newId;
      const readAllTalkers = JSON.parse(fs.readFileSync(TALKER_ARC, 'utf8'));
      const talkersWithExcludedById = readAllTalkers.filter((talker) => talker.id !== newId);
      talkersWithExcludedById.push(newTalker);
      fs.writeFileSync('./talker.json', JSON.stringify(talkersWithExcludedById));
      response.status(200).json(newTalker);
      } catch (err) {
        response.status(500).send({ err });
      }
  },
);

// req 06
function removeTalkerById(talkers, id) {
  return talkers.filter((talke) => talke.id !== Number(id));
}

app.delete(
  '/talker/:id',
  verifyToken,
  (request, response) => {
    const allTalkers = JSON.parse(fs.readFileSync(TALKER_ARC, 'utf8'));
    const newTalkerList = removeTalkerById(allTalkers, request.params.id);
    fs.writeFileSync(TALKER_ARC, JSON.stringify(newTalkerList, null, '\t'));
    return response.status(HTTP_OK_STATUS)
    .send({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
