const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const Crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const allTalkers = JSON.parse(fs.readFileSync('talker.json'));
  res.status(200).json(allTalkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync('talker.json'));

  const specificTalker = allTalkers.find((talker) => (String(talker.id) === id));
  if (!specificTalker) {
    return res.status(404).json(
      { message: 'Pessoa palestrante não encontrada' },
  ); 
}
  return res.status(200).json(specificTalker);
});

function randomString(size = 16) {  
  return Crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size);
}

app.post('/login', [
  (req, res, next) => {
    if (!req.body.email || req.body.email.length === 0) {
      return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' }); 
    }
    const { email } = req.body;
    if (!/^[A-Z0-9._-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email)) {
      return res.status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    }
    next();
  },
  (req, res, next) => {
    if (!req.body.password || req.body.password.length === 0) {
      return res.status(400)
        .json({ message: 'O campo "password" é obrigatório' }); 
    }
    if (req.body.password.length < 6) {
      return res.status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
    }
    next();
  },
  (_req, res) => {
    const token = randomString();
    res.status(200).send({ token });
  },
]);

app.post('/talker', [
  (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization === '') {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (req.headers.authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  },
  (req, res, next) => {
    if (!req.body.name || req.body.name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (req.body.name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  },
  (req, res, next) => {
    if (!req.body.age || req.body.age === '') {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (req.body.age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  },
  (req, res, next) => {
    if (!req.body.talk || req.body.talk === '') {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
    const { watchedAt, rate } = req.body.talk;
    if (!watchedAt || !rate) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
    next();
  },
  (req, res, next) => {
    const { watchedAt } = req.body.talk;
    // https://support.dooblo.net/hc/en-us/articles/208295925-How-To-Validate-Date-Format-Using-Regular-Expression
    if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/i.test(watchedAt)) {
      return res.status(400).json(
        { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
    }
    next();
  },
  (req, res, next) => {
    const { rate } = req.body.talk;
    if (rate < 1 || rate > 5 || rate % 1 !== 0) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  },
  async (req, res) => {
    const talkersList = await JSON.parse(fs.readFileSync('talker.json'));
    const newTalker = { ...req.body, id: talkersList.length + 1 };
    const updatedList = [...talkersList, newTalker];
    const listString = JSON.stringify(updatedList);
      await fs.writeFile('talker.json', listString, (err) => {
        if (err) {
          console.log(err);
        }
      });
      return res.status(201).json(newTalker);
  },
]);

/* app.put('/talker/:id', (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync('talker.json'));

  const specificTalker = allTalkers.find((talker) => (String(talker.id) === id));
}); */

app.listen(PORT, () => {
  console.log('Online');
});
