const crypto = require('crypto');
const validation = require('../../validation');

function login(req, res, next) {
  const { error } = validation.login.validate(req.body);

  if (error) return next(error);

  const token = { token: crypto.randomBytes(8).toString('hex') };

  res.status(200).json(token);
}

module.exports = login;
