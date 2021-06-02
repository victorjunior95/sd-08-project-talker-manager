// Sugestão da lib Joi feita pela Grande Rosi =)
const joi = require('joi');

const REGEX_PASSWORD = new RegExp('^[a-zA-Z0-9]{3,30}$');
// https://joi.dev/api/?v=17.4.0#example

const login = joi
  .object({
    email: joi
      .string()
      .email()
      .message('O "email" deve ter o formato "email@email.com"')
      .required(),
    password: joi
      .string()
      .pattern(REGEX_PASSWORD)
      .message('O "password" deve ter pelo menos 6 caracteres')
      .required(),
  })
  .messages({
    'any.required': 'O campo {#label} é obrigatório',
  });

module.exports = login;
