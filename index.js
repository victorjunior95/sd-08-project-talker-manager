const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {
  validateLogin,
  validateToken,
  validateNameAge,
  validateTalkData,
  validateTalkInfo,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));
const generateToken = () => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = upperCase.toLowerCase();
  const numbers = '1234567890';
  const possibleChars = numbers.concat(lowerCase, upperCase);
  let token = '';
  const TOKEN_LENGTH = 16;
  for (let index = 0; index < TOKEN_LENGTH; index += 1) {
    const randomIndex = Math.floor(Math.random() * possibleChars.length);
    token += possibleChars[randomIndex];
  }
  return token;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validateToken, (req, res, next) => {
  try {
    const talkers = getTalkers();
    const queryString = req.query.q.toLowerCase();
    if (!queryString) return next();
    const foundTalkers = talkers.filter((talker) =>
      talker.name.toLowerCase().includes(queryString));
    return res.status(200).json(foundTalkers);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/talker', (_req, res) => {
  try {
    const talkers = getTalkers();
    res.status(200).send(talkers);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/talker/:id', (req, res) => {
  try {
    const talkers = getTalkers();
    const idParam = parseInt(req.params.id, 10);
    const person = talkers.find((talker) => talker.id === idParam);
    if (person) {
      res.status(200).send(person);
    } else {
      res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/login', validateLogin, (_req, res) => {
  const token = generateToken();
  res.status(200).send({ token });
});

app.post(
  '/talker',
  validateToken,
  validateNameAge,
  validateTalkData,
  validateTalkInfo,
  (req, res) => {
    try {
      const talkers = getTalkers();
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
  validateToken,
  validateNameAge,
  validateTalkData,
  validateTalkInfo,
  (req, res) => {
    try {
      const talkers = getTalkers();
      const newData = req.body;
      const talkerIdUpdate = parseInt(req.params.id, 10);
      newData.id = talkerIdUpdate;
      const updatedTalkers = talkers.map((talker) => {
        if (talker.id === talkerIdUpdate) {
          return { ...newData };
        }
        return talker;
      });
      fs.writeFileSync('talker.json', JSON.stringify(updatedTalkers));
      res.status(200).json(newData);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);

app.delete('/talker/:id', validateToken, (req, res) => {
  try {
    const talkers = getTalkers();
    const deleteId = parseInt(req.params.id, 10);
    const newTalkers = talkers.filter((talker) => talker.id !== deleteId);
    fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
