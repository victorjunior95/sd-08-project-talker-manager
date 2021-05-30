const crypto = require('crypto');
const loginSchema = require('../../schema/login');

module.exports = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) return next(error);

  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
};
