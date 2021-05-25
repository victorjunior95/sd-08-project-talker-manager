const crypto = require('crypto');
const validateEmail = require('./helpers/validateEmail');
const validatePassword = require('./helpers/validatePassword');

function getToken(req, res) {
  const { email, password } = req.body; 
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  if (!emailValidation.validated) {
    res.status(400).send({ message: emailValidation.message });
    return;
  }
  if (!passwordValidation.validated) {
    res.status(400).send({ message: passwordValidation.message });
    return;
  }
  res.status(200).send({ token: crypto.randomBytes(8).toString('hex') });
}

module.exports = getToken;
