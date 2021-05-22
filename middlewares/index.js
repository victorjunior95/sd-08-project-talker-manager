const util = require('../util');

function authMiddleware(request, response, next) {
  const token = request.headers.authorization;

  if (token && token.length !== 16) return response.status(401).json({ message: 'Token inválido' });

  return token
    ? next()
    : response.status(401).json({ message: 'Token não encontrado' });
}

function loginMiddleware(request, response, next) {
  const { email, password } = request.body;
  const isEmailValid = util.verifyEmail(email);
  const isPasswordValid = util.verifyPassword(password);
  const validations = [isEmailValid, isPasswordValid]
    .every((validation) => validation === true);

  if (validations) {
    const token = util.getAuthenticationToken();
    request.headers.authorization = token;
    next();
  }
  
  if (isPasswordValid !== true) return response.status(400).json({ message: isPasswordValid });
  if (isEmailValid !== true) return response.status(400).json({ message: isEmailValid });
}

function verifyTalkerMiddleware(request, response, next) {
  const validations = util.verifyTalkerData(request.body);
  const { talk } = request.body;
  const errorMessage = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!talk) return response.status(400).json({ message: errorMessage });

  const allCorrectData = validations.every((validation) => validation === true);

  if (allCorrectData) {
    next();
  }
  
  return validations.find((validation) => validation !== true
    && response.status(400).json({ message: validation }));
}

module.exports = {
  authMiddleware,
  loginMiddleware,
  verifyTalkerMiddleware,
};
