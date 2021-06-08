const routes = require('express').Router();

const SessionsController = require('./controllers/SessionsController');
const TalkersControllers = require('./controllers/TalkersController');

const tokenMiddleware = require('./middlewares/TokenMiddleware');
const ageMiddleware = require('./middlewares/AgeMiddleware');
const nameMiddleware = require('./middlewares/NameMiddleware');
const talkMiddleware = require('./middlewares/TalkMiddleware');
const talkIsValidMiddleware = require('./middlewares/TalkIsValidMiddleware');
const loginMiddleware = require('./middlewares/LoginMiddleware');

routes.get('/talker', TalkersControllers.index);
routes.get('/talker/search', tokenMiddleware, TalkersControllers.indexBySearch);
routes.get('/talker/:id', TalkersControllers.indexById);

routes.post('/login', loginMiddleware, SessionsController.create);

routes.use(tokenMiddleware);

routes.delete('/talker/:id', TalkersControllers.delete);

routes.use(nameMiddleware);
routes.use(ageMiddleware);
routes.use(talkMiddleware);
routes.use(talkIsValidMiddleware);

routes.post('/talker', TalkersControllers.create);
routes.put('/talker/:id', TalkersControllers.update);

module.exports = routes;