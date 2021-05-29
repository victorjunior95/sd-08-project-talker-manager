const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const FILE_NAME = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
    res.status(200).send(talkers);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/talker/:id', (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
    const idTalker = Number(req.params.id);
    const talker = talkers[idTalker - 1];
  if (talker) {
    res.status(200).send(talker);
  } else {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /.+@[A-z]+[.]com/;
  const isValidEmail = regex.test(email);
  if (!email) { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isValidEmail) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) { 
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

const getValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  const regex = /^([A-Z0-9]){16}$/i;
  const tokenIsValid = regex.test(token);
  if (!token) {
      res.status(401);
      res.send({ message: 'Token não encontrado' });
  }
  if (!tokenIsValid) {
    res.status(401);
    res.send({ message: 'Token inválido' });
}
  next();
};

const getValidAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) { 
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) { 
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const getValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) { 
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) { 
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const getValidTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) { 
    return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (typeof talk.rate === 'undefined' || !talk.watchedAt) { 
    return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const getValidTalkData = (req, res, next) => {
  const regex = /^\d\d\/\d\d\/\d\d\d\d$/;
  const isValidDate = regex.test(req.body.talk.watchedAt);
  const rateNumber = Number(req.body.talk.rate);
  const isValidRate = Number.isInteger(rateNumber) && rateNumber >= 1 && rateNumber <= 5;
  if (!isValidRate) { 
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!isValidDate) { 
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

app.post('/talker',
  getValidToken,
  getValidAge,
  getValidName,
  getValidTalk,
  getValidTalkData,
  (req, res) => {
    try {
      const talkers = JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
      const newTalkerUpdate = req.body;
      newTalkerUpdate.id = talkers.length + 1;
      talkers.push(newTalkerUpdate);
      fs.writeFileSync(FILE_NAME, JSON.stringify(talkers));
      return res.status(201).json(newTalkerUpdate);
    } catch (err) {
      return res.status(500).send({ err });
    }
});

app.put('/talker/:id',
  getValidToken,
  getValidAge,
  getValidName,
  getValidTalk,
  getValidTalkData,
  (req, res) => {
    try {
      const talkers = JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
      const newTalker = req.body;
      const talkerIdToUpdate = Number(req.params.id);
      newTalker.id = talkerIdToUpdate;
      const updatedTalkers = talkers.map((talker) => {
        if (talker.id === talkerIdToUpdate) {
          return { ...newTalker };
        }
        return talker;
      });
      fs.writeFileSync(FILE_NAME, JSON.stringify(updatedTalkers));
      res.status(200).json(newTalker);
    } catch (err) {
      return res.status(500).send({ err });
    }
});

app.delete('/talker/:id',
 getValidToken, 
 (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
    const idToDelete = Number(req.params.id);
    const deleteTalker = talkers.filter((talker) => talker.id !== idToDelete);
    fs.writeFileSync('talker.json', JSON.stringify(deleteTalker));
    return res
    .status(200)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res
    .status(500)
    .send({ err });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
