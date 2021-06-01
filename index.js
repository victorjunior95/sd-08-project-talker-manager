const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
const path = './talker.json';
// Requisito 01 -----------------------------------------------------
app.get('/talker', async (req, res) => { 
  const data = await fs.readFile(path, 'utf8');
  res.status(200).json(JSON.parse(data));
});

function messages(req, res, next) {
  const { email, password } = req.body;
  const validEmail = /.+@[A-z]+[.]com/.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
}

// Requisito 02 -----------------------------------------------------
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params; 
  const data = await fs.readFile(path, 'utf8');
  const talkers = JSON.parse(data);
  const findTalker = talkers.find((talker) => talker.id === parseInt(id, 10));
      if (!findTalker) {
       return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } 
     return res.status(200).json(findTalker);
 });
 
// Requisito 03 -----------------------------------------------------
app.post('/login', messages, (req, res) => { 
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

function authToken(req, res, next) {
   const { authorization } = req.headers;
   if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
   if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
   return next();
}

// Requisito 04 ----------------------------------------------------
function isValidName(req, res, next) {
  const { name } = req.body;  
   if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
   if (name.length < 3) {
     return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
}

function isValidAge(req, res, next) {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
}

function isValidDate(date) {
  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const validDate = dateRegex.test(date);
  if (!validDate) return false;
  return true;
}

function isValidRate(rate) {
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) return false;
  return true;
}

function isValidRateDate(req, res, next) {
  const { talk } = req.body;
   if (!isValidRate(talk.rate)) {
   return res.status(400)
   .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
 }
  if (!isValidDate(talk.watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  return next();
}

function isValidTalk(req, res, next) {
  const { talk } = req.body;  
  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!Object.prototype.hasOwnProperty.call(talk, 'watchedAt') 
  || !Object.prototype.hasOwnProperty.call(talk, 'rate')) {
    return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  } 
  return next();
}

app.post('/talker', authToken, isValidName, isValidAge, isValidTalk, isValidRateDate, 
  async (req, res) => {
  const data = await fs.readFile(path, 'utf8');
  const talker = JSON.parse(data); 
  const addTalker = req.body;
  addTalker.id = talker.length + 1;
  talker.push(addTalker);
  fs.writeFile('./talker.json', JSON.stringify(talker));
  res.status(201).json(addTalker);
});

// Requisito 5 ------------------------------
app.put('/talker/:id', authToken, isValidName, isValidAge, isValidTalk, isValidRateDate, 
  async (req, res) => {
  const data = await fs.readFile(path);
  const talkers = JSON.parse(data.toString('utf8'));
  const { id } = req.params;
  const { name, age, talk } = req.body;
  talkers[id - 1] = {
    id: Number(id),
    name,
    age: Number(age),
    talk: {
      watchedAt: talk.watchedAt,
      rate: Number(talk.rate),
    },
  };
 console.log(talkers[id - 1]);
  fs.writeFile('./talker.json', JSON.stringify(talkers)); 
  res.status(200).send(talkers[id - 1]);
});

// Requisito 6 ------------------------------
app.delete('/talker/:id', authToken, async (req, res) => {
  const { id } = req.params;
  const numId = Number(id);
  const data = await fs.readFile(path, 'utf8');
  const talkers = JSON.parse(data); 
  // const findTalker = talkers.find((talker) => talker.id === parseInt(id, 10));
  const index = numId - 1;
  talkers.splice(index, 1);
  fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
