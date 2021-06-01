const express = require('express');
const SessionsController = require('./controllers/SessionsControllers');
const TalkersControllers = require('./controllers/TalkersControllers');

const tokenMiddleware = require('./middlewares/token');
const ageMiddleware = require('./middlewares/age');
const nameMiddleware = require('./middlewares/name');
const talkMiddleware = require('./middlewares/talk');
const talkIsValidMiddleware = require('./middlewares/talkIsValid');

const routes = express.Router();

routes.get('/talker', TalkersControllers.index);
routes.get('/talker/search', tokenMiddleware, TalkersControllers.search);
routes.get('/talker/:id', TalkersControllers.id);
routes.create('/talker',
  ageMiddleware,
  nameMiddleware,
  talkMiddleware,
  talkIsValidMiddleware,
  TalkersControllers.create);
routes.put('/talker/:id',
  ageMiddleware,
  nameMiddleware,
  talkMiddleware,
  talkIsValidMiddleware,
  TalkersControllers.update);
routes.delete('/talker/:id', tokenMiddleware, TalkersControllers.delete);

routes.post('/login', SessionsController.create);

module.exports = routes;