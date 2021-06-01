const Joi = require('joi');
const Crypto = require('crypto');

function randomString(size = 16) {  
  return Crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size);
}

const schema = Joi.object({
  email: Joi.string().email().message('O "email" deve ter o formato "email@email.com"').required(),
  password: Joi.string().min(6).message('O "password" deve ter pelo menos 6 caracteres').required(),
}).messages({
  'any.required': 'O campo {#label} é obrigatório',
});

// https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation
// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages

const validateLogin = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ message: error.message });
  const token = randomString();
  res.json({ token });
  next();
};

module.exports = validateLogin;
