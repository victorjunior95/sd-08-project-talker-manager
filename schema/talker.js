const joi = require('joi');

module.exports = joi.object({
  name: joi
    .string()
    .min(3)
    .message('O {#label} deve ter pelo menos 3 caracteres')
    .required(),
  age: joi
    .number()
    .integer()
    .min(18)
    .message('A pessoa palestrante deve ser maior de idade')
    .required(),
  talk: joi
    .object({
      watchedAt: joi
        .string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
        .message('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"')
        .required(),
      rate: joi
        .number()
        .min(1)
        .max(5)
        .required()
        .messages({
          'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
          'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
        }),
    })
    .messages({
      'any.required': 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    })
    .required(),
})
  .messages({
    'any.required': 'O campo {#label} é obrigatório',
  });
