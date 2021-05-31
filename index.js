const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getData = () => {
  const file = fs.readFileSync('./talker.json');
  return JSON.parse(file || '[]');
};

const writeData = (data) => {
  fs.writeFileSync('./talker.json', JSON.stringify(data));
};

const validateLogin = (email, password) => {
  if (!email) return 'O campo "email" é obrigatório';
  if (!/^.+@.+\.com/.test(email)) return 'O "email" deve ter o formato "email@email.com"';
  if (!password) return 'O campo "password" é obrigatório';
  if (password.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
};

const tokens = [];
const tokenGenerate = (size = 16) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < size; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * 62));
  }
  return token;
};

app.post('/login', (req, _resp, next) => {
  const { email, password } = req.body;
  const errMessage = validateLogin(email, password);
  if (!errMessage) return next();
  const error = new Error(errMessage);
  error.status = 400;
  return next(error);
}, (_req, resp) => {
  const token = tokenGenerate();
  tokens.push(token);
  resp.json({ token });
});

const validateToken = (token) => {
  if (token && token.length !== 16) return 'Token inválido';
  if (!tokens.includes(token)) return 'Token não encontrado';
};

const checkTalkFields = (watchedAt, rate) => {
  if (!/\d{2}\/\d{2}\/\d{4}/.test(watchedAt)) {
    return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
  if (!/^\d$/.test(rate) || parseInt(rate, 10) > 5 || parseInt(rate, 10) < 1) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
};

const validateTalk = (talk) => {
  const { watchedAt, rate } = talk || {};
  if (!talk || watchedAt === undefined || rate === undefined) {
    return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  }
  return checkTalkFields(watchedAt, rate);
};

const validateTalker = (name, age, talk) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'A pessoa palestrante deve ser maior de idade';
  return validateTalk(talk);
};

const successAddTalk = (data) => {
  const array = getData();
  const id = !array || array.length === 0 ? 1 : array.sort((a, b) => b.id - a.id)[0].id + 1;
  const dataToBeAdded = { id, ...data };
  const newData = [...array, dataToBeAdded];
  writeData(newData);
  return dataToBeAdded;
};

const successEditTalk = (data, idEdit) => {
  const array = getData();
  const dataToBeAdded = { id: idEdit, ...data };
  const editedArray = array.map((talker) => (talker.id === idEdit ? dataToBeAdded : talker));
  writeData(editedArray);
  return dataToBeAdded;
};

const validateTokenMiddleware = (req, _resp, next) => {
    const { authorization: token } = req.headers;
    const errToken = validateToken(token);
    if (errToken) {
      const err = new Error(errToken);
      err.status = 401;
      return next(err);
    }
    next();
};

const validateTalkerMiddleware = (req, _resp, next) => {
    const { name, age, talk } = req.body;
    const errTalk = validateTalker(name, age, talk);
    if (errTalk) {
      const err = new Error(errTalk);
      err.status = 400;
      return next(err);
    }
    next();
};

app.route('/talker')
  .get((_req, resp) => {
    const data = getData();
    resp.status(HTTP_OK_STATUS).json(data);
  })
  .post(validateTokenMiddleware, validateTalkerMiddleware, (req, resp) => {
    const { name, age, talk } = req.body;
    const data = successAddTalk({ name, age, talk });
    resp.status(201).json(data);
  });

app.get('/talker/search', validateTokenMiddleware, (req, resp) => {
  const searchTerm = req.query.q;
  const data = getData();
  if (!searchTerm) resp.status(HTTP_OK_STATUS).json(data);
  const result = data.filter(({ name }) => name.includes(searchTerm));
  resp.status(HTTP_OK_STATUS).json(result);
});

app.route('/talker/:id')
  .get((req, resp, next) => {
    const data = getData();
    const talker = data.find(({ id }) => req.params.id === id.toString());
    if (talker !== undefined) resp.status(HTTP_OK_STATUS).json(talker);
    else {
      const error = new Error('Pessoa palestrante não encontrada');
      error.status = 404;
      return next(error);
    }
  })
  .all(validateTokenMiddleware)
  .put(validateTalkerMiddleware, (req, resp) => {
    const { name, age, talk } = req.body;
    const id = parseInt(req.params.id, 10);
    const data = successEditTalk({ name, age, talk }, id);
    resp.status(HTTP_OK_STATUS).json(data);
  })
  .delete((req, resp) => {
    const data = getData();
    const removedTalker = data.filter(({ id }) => id !== parseInt(req.params.id, 10));
    writeData(removedTalker);
    resp.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

app.use((err, _req, res, _next) => { res.status(err.status).json({ message: err.message }); });
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
