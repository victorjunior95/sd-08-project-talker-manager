const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const path = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req01
app.get('/talker', async (req, resp) => {
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  resp.status(200).json(data);
});

// Req02
app.get('/talker/:id', async (req, resp) => {
  const { id } = req.params;
  // console.log(`id solicitado: ${id}`);
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  // console.log(data);
  const searchId = data.find((el) => el.id === Number(id));
  // console.log(searchId);
  if (!searchId) {
    return resp.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return resp.status(200).json(searchId);
});

// Req03
function loginCheck(req, resp, next) {
  const { email, password } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const emailCheckFormat = emailRegex.test(email);
  if (!email) {
    return resp.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailCheckFormat) {
    return resp.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return resp.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return resp.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
}

app.post('/login', loginCheck, async (req, resp) => {
  const token = crypto.randomBytes(8).toString('hex');
  return resp.status(200).json({ token });
});

// Req04
function tokenCheck(req, resp, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return resp.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return resp.status(401).json({ message: 'Token inválido' });
  }
  return next();
}

function nameCheck(req, resp, next) {
  const { name } = req.body;
  if (!name) {
    return resp.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return resp.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
}

  function ageCheck(req, resp, next) {
    const { age } = req.body;
    if (!age) {
      return resp.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return resp.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  return next();
  }

  function talkCheck(req, resp, next) {
    const { talk } = req.body;
    if (!talk || talk === {}) {
      return resp.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    return next();
  }

  function existRateDate(req, resp, next) {
    const { talk } = req.body;
    const { watchedAt, rate } = talk;
    const checkRateDate = (watchedAt === undefined || rate === undefined);
    if (checkRateDate) {
      return resp.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    return next();
  }

  // Validação Regex(https://hkotsubo.github.io/blog/2019-04-05/posso-usar-regex-para-validar-datas)
  function dateCheck(req, resp, next) {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const dateRegexCheck = dateRegex.test(watchedAt);
    if (!dateRegexCheck) {
      return resp.status(400).json({ 
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
  }

  function rateCheck(req, resp, next) {
    const { talk } = req.body;
    const { rate } = talk;
    if ((rate < 1 || rate > 5 || !Number.isInteger(rate))) {
      return resp.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    return next();
  }

app.post('/talker', tokenCheck, nameCheck, ageCheck, talkCheck, existRateDate, rateCheck, dateCheck,
  async (req, resp) => {
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  const newTalker = req.body;
  newTalker.id = data.length + 1;
  data.push(newTalker);
  await fs.writeFile(path, JSON.stringify(data));
  resp.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
