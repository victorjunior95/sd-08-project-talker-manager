const routes = require('express').Router();

const SessionsController = require('./controllers/SessionsController');
const TalkersControllers = require('./controllers/TalkersController');

const tokenMiddleware = require('./middlewares/TokenMiddleware');
const ageMiddleware = require('./middlewares/AgeMiddleware');
const nameMiddleware = require('./middlewares/NameMiddleware');
const talkMiddleware = require('./middlewares/TalkMiddleware');
const talkIsValidMiddleware = require('./middlewares/TalkIsValidMiddleware');

routes.get('/talker', TalkersControllers.index);
routes.get('/talker/search', tokenMiddleware, TalkersControllers.indexBySearch);
routes.get('/talker/:id', TalkersControllers.indexById);
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