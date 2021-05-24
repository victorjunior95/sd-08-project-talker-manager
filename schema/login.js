const joi = require('joi');

module.exports = joi.object({
  email: joi
    .string()
    .email()
    .message('O "email" deve ter o formato "email@email.com"')
    .required(),
  password: joi
    .string()
    .pattern(/^\w{6,}$/)
    .message('O "password" deve ter pelo menos 6 caracteres')
    .required(),
})
  .messages({
    'any.required': 'O campo {#label} é obrigatório',
  });
