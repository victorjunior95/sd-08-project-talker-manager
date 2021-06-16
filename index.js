import * as M from './messages';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {
  loginValidation,
  validationAndRegexToken,
  nameAndAgeValidation,
  talkInfoValidation,
  talkDateValidation,
} = require('./ValidationAndRegex');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkerJSON = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));

const createToken = () => {
  const TO_UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = TO_UPPER_CASE.toLowerCase();
  const numbers = '1234567890';
  const possibleChars = numbers.concat(lowerCase, TO_UPPER_CASE);
  let token = '';
  const TOKEN_LENGTH = 16;
  for (let index = 0; index < TOKEN_LENGTH; index += 1) {
    const randomIndex = Math.floor(Math.random() * possibleChars.length);
    token += possibleChars[randomIndex];
  }
  return token;
};
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validationAndRegexToken, (req, res, next) => {
  try {
    const talkers = getTalkerJSON();
    const query = req.query.q.toLowerCase();
    if (!query) return next();
    const matchTalkers = talkers.filter((talker) =>
      talker.name.toLowerCase().includes(query));
    return res.status(200).json(matchTalkers);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/talker', (_req, res) => {
  try {
    const talkers = getTalkerJSON();
    res.status(200).send(talkers);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/login', loginValidation, (_req, res) => {
  const token = createToken();
  res.status(200).send({ token });
});

app.post(
  '/talker',
  validationAndRegexToken,
  nameAndAgeValidation,
  talkInfoValidation,
  talkDateValidation,
  (req, res) => {
    try {
      const talkers = getTalkerJSON();
      const newTalker = req.body;
      newTalker.id = talkers.length + 1;
      talkers.push(newTalker);
      fs.writeFileSync('talker.json', JSON.stringify(talkers));
      res.status(201).json(newTalker);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);

app.put(
  '/talker/:id',
  validationAndRegexToken,
  nameAndAgeValidation,
  talkInfoValidation,
  talkDateValidation,

  (req, res) => {
    try {
      const talkers = getTalkerJSON();
      const DATA = req.body;
      const talkerIdUpdate = parseInt(req.params.id, 10);
      DATA.id = talkerIdUpdate;
      const updatedTalkers = talkers.map((talker) => {
        if (talker.id === talkerIdUpdate) {
          return { ...DATA };
        }
        return talker;
      });
      fs.writeFileSync('talker.json', JSON.stringify(updatedTalkers));
      res.status(200).json(DATA);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);

app.delete('/talker/:id', validationAndRegexToken, (req, res) => {
  try {
    const talkers = getTalkerJSON();
    const deleteId = parseInt(req.params.id, 10);
    const newTalkers = talkers.filter((talker) => talker.id !== deleteId);
    fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
    res.status(200).json({ message: M.DELETED_PERSON_SUCESS });
  } catch (err) {
    return res.status(500).send({ err });
  }
});
app.listen(PORT, () => {
  console.log('Online');
});