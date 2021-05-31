const crypto = require('crypto');
const schema = require('../../schemas');

function login(req, res, next) {
  const { error } = schema.login.validate(req.body);

  if (error) return next(error);

  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
}

module.exports = login;
