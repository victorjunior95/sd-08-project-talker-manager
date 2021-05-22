const showAllMiddleware = require('./talkers');
const showOneMiddleware = require('./showOne');
const loginMiddleware = require('./login');
const verifyToken = require('./verifyToken');
const createTalker = require('./createTalker');

module.exports = {
  showAllMiddleware,
  showOneMiddleware,
  loginMiddleware,
  verifyToken,
  createTalker,
};
