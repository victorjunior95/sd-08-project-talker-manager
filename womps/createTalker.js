const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const meuArquivo = 'talker.json';

function checkToken(authorization) {
  if (!authorization) throw new Error('Token não encontrado');
  if (authorization.length < 16) throw new Error('Token inválido');
}

function checkName(name) {
  if (!name) throw new Error('O campo "name" é obrigatório');
  if (name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');
}

function checkAge(age) {
  if (!age) throw new Error('O campo "age" é obrigatório');
  if (age < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
}

function checkRate(talk) {
  if (!talk.rate) {
    throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'); 
}
}

function checkWatchedAt(talk) {
  if (!talk.watchedAt) {
    throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
  }
}

function checkWatchedRate(talk) {
  const { watchedAt, rate } = talk;
  const re = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/; // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  if (!re.test(watchedAt)) throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  if (rate < 1 || rate > 5) throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
}

function checkTalk(req) {
  if (!req.body.talk) {
    throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'); 
  }
}
function checks(req) {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  checkToken(authorization);
  checkName(name);
  checkAge(age);
  checkTalk(req);
  checkWatchedAt(talk);
  checkWatchedRate(talk);
  checkRate(talk);
}
// function checkTalkWatchedRate(talk, req) {
//   checkTalk(req);
//   checkRate(talk);
//   checkWatchedAt(talk);
// }

module.exports = (req, res) => {
  const data = JSON.parse(fs.readFileSync(meuArquivo, 'utf-8'));
  const { name, age, talk } = req.body;
  try {
    checks(req);
    data.push({ name, age, id: data.length + 1, talk });
    fs.writeFileSync('talker.json', JSON.stringify(data));
    res.status(201).json(data[data.length - 1]);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    return res.status(400).json({ message: error.message });
  }
};
