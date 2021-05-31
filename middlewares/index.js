// são  funções Middleware para ficar mais organizado 
const tokenMidd = require('./tokenMiddleware');
const ageMidd = require('./ageMiddleware');
const nameMidd = require('./nameMiddleware');
const talkMidd = require('./talkMiddlewares');
const talkValiMidd = require('./talkValidMiddleware');

module.exports = {
  tokenMidd,
  ageMidd,
  nameMidd,
  talkMidd,
  talkValiMidd,
};