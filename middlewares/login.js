const util = require('../util');

function loginThisCorrect(req, res, next) {
  console.log(Object.keys(req.headers));
  const { email, password } = req.body;
  if (!email) {
    next({ status: 400, message: 'O campo "email" é obrigatório' }); 
  } else if (!util.isEmail(email)) {
    next({ status: 400, message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    next({ status: 400, message: 'O campo "password" é obrigatório' });
  } else if (password.length < 6) {
    next({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function logged(req, res, next) {
  const { email } = req.query;
  const token = util.token(email);
  if (token.length === 16 && typeof token === 'string') {
    return res.status(200).send({ token });
  } 
    next({ status: 400, message: 'Unexpected error' });
}

module.exports = {
  loginThisCorrect, 
  logged,
};
