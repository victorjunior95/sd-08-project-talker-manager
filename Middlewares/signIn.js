const crypto = require('crypto');
const { HandleCustomerError } = require('./HandleCustomerError');
const { typeRegex, httpRequest, returnMessage: { SIGN_IN } } = require('../constant');

const valid = () => ({
  email: (email) => new RegExp(typeRegex.VALID_EMAIL).test(email),
  password: (password) => password && password.toString().length >= 6,
});

const verifyEmail = (email) => {
  if (!email) throw new HandleCustomerError(SIGN_IN.EMAIL_NULL);
  const isValid = valid().email(email);
  if (!isValid) throw new HandleCustomerError(SIGN_IN.EMAIL_INVALID);
};

const verifyPassword = (password) => {
  if (!password) throw new HandleCustomerError(SIGN_IN.PASSWORD_NULL);
  const isValid = valid().password(password);
  if (!isValid) throw new HandleCustomerError(SIGN_IN.PASSWORD_INVALID);
};

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  try {
    verifyEmail(email);
    verifyPassword(password);
    res.status(httpRequest.HTTP_OK_STATUS)
    .json({ token: crypto.randomBytes(8).toString('hex') });
    next();
  } catch (error) {
    res.status(httpRequest.HTTP_BAD_REQUEST_STATUS)
    .json({ message: error.message });
  }
};
