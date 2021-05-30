const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./Middlewares/talker');
const talkerByIdMiddleware = require('./Middlewares/talkerById');
const login = require('./Middlewares/login');
const auth = require('./Middlewares/auth');
const ageMiddleware = require('./Middlewares/age');
const nameMiddleware = require('./Middlewares/name');
const watchedAtandRate = require('./Middlewares/watchedAtandRate');
const talkMiddleware = require('./Middlewares/talk');
const { postTalker, showLastTalker } = require('./helpers/DBManagement');
const putMiddleware = require('./Middlewares/putMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);
app.get('/talker/:id', talkerByIdMiddleware);
app.post('/login', login);
app.post(
  '/talker',
  auth, 
  nameMiddleware, 
  ageMiddleware, 
  talkMiddleware,
  watchedAtandRate, 
  (req, res) => {
    const newTalker = req.body;
    postTalker(newTalker);
    res.status(201).json(showLastTalker());
  },  
);

app.put(
  '/talker/:id', 
  auth, 
  nameMiddleware, 
  ageMiddleware, 
  talkMiddleware, 
  watchedAtandRate,
  putMiddleware,
);

app.listen(PORT, () => {
  console.log('Online');
});