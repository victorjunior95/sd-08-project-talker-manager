const { HandleCustomerError } = require('./HandleCustomerError');
const { typeRegex, httpRequest, returnMessage: { AUTH_TOKEN } } = require('../constant');

const valid = () => ({
  token: (token) => new RegExp(typeRegex.VALID_EXIST_CHARACTER_STRING_NUMBER)
  .test(token) && token.length >= 16,
});

const verifyFieldToken = (token = '') => {
  if (!token) throw new HandleCustomerError(AUTH_TOKEN.TOKEN_NOT_EXIST);
  const isValid = valid().token(token); 
  if (!isValid) throw new HandleCustomerError(AUTH_TOKEN.INVALID_TOKEN);
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    verifyFieldToken(authorization);
    next();
  } catch (error) {
    res.status(httpRequest.HTTP_AUTHENTICATION_NEGATED_STATUS)
    .json({ message: error.message });
  }
};