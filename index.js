const fs = require('fs');

const bodyParser = require('body-parser');
const express = require('express');

const M = require('./messages.js');
const middleware = require('./ValidationAndRegex');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkerJSON = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));

const createToken = () => {
  const UPPER_CASE_LETTERS = 'ABCDEFGIJKLMNOPQRSTUVWXYZ';
  const LOWER_CASE_LETTERS = UPPER_CASE_LETTERS.toLowerCase();
  const NUMBERS = '1234567890';
  const ALPHA_NUMERICAL_CHARS = NUMBERS.concat(LOWER_CASE_LETTERS, UPPER_CASE_LETTERS);

  let token = '';

  for (let index = 0; index < 16; index += 1) {
    const randomIndex = Math.floor(Math.random() * ALPHA_NUMERICAL_CHARS.length);
    token += ALPHA_NUMERICAL_CHARS[randomIndex];
  }

  return token;
};

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', middleware.validationAndRegexToken, (req, res, next) => {
  try {
    const talkers = getTalkerJSON();
    const desiredTalker = req.query.q;

    if (!desiredTalker) return next();

    const matches = talkers.filter((talker) => {
      const insensitiveName = talker.name.toLowerCase();
      const insensitiveQuery = desiredTalker.toLowerCase();
      
      return insensitiveName.includes(insensitiveQuery);
    });

    return res.status(200).json(matches);
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

app.post('/login', middleware.loginValidation, (_req, res) => {
  const token = createToken();
  res.status(200).send({ token });
});

app.post(
  '/talker',
  middleware.validationAndRegexToken,
  middleware.nameAndAgeValidation,
  middleware.validateTalkPayload,
  middleware.validateRateAndWatchedatPayload,
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

<<<<<<< HEAD
app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const getTalker = getTalkerJSON();
  const talkerById = getTalker.find((talker) => talker.id === parseInt(id, 10));

  return talkerById 
   ? response.status(200).json(talkerById)
   : response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
=======
app.get('/talker/:id', (req, res) => {
  try {
    const talkers = getTalkerJSON();
    const idParam = parseInt(req.params.id, 10);
    const person = talkers.find((talker) => talker.id === idParam);

    if (person) return res.status(200).send(person);
    
     return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    return res.status(500).send({ err });
  }
>>>>>>> 2b98d0a38d72eccac1bb19eaca79a9d3796e7a1d
});

app.put(
  '/talker/:id',
  middleware.validationAndRegexToken,
  middleware.nameAndAgeValidation,
  middleware.validateRateAndWatchedatPayload,
  middleware.validateTalkPayload,

  (req, res) => {
    try {
      const talkers = getTalkerJSON();
      const DATA = req.body;
      const talkerIdUpdate = parseInt(req.params.id, 10);
      DATA.id = talkerIdUpdate;      
      const updatedTalkers = talkers.map((t) => t.id).includes(talkerIdUpdate)
        ? talkers 
        : [...talkers, DATA];
      fs.writeFileSync('talker.json', JSON.stringify(updatedTalkers));
      res.status(200).json(DATA);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);
 // Não entendo o porquê desta função não ser executada??
 // const updatedTalkers = talkers.map((t) => t.id).includes(talkerIdUpdate)
      //   ? { ...DATA }
      //   : { ...talkers };

app.delete('/talker/:id', middleware.validationAndRegexToken, (req, res) => {
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