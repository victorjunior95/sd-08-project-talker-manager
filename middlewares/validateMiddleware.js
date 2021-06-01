const Joi = require('joi');

// https://medium.com/xp-inc/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f

const schema = Joi.object({
  name: Joi.string().min(3).messages({
    'string.min': 'O "name" deve ter pelo menos 3 caracteres',
    'any.required': 'O campo "name" é obrigatório',
  }).required(),
  age: Joi.number().min(18).messages({
    'number.min': 'A pessoa palestrante deve ser maior de idade',
    'any.required': 'O campo "age" é obrigatório',
  }).required(),
  talk: Joi.object().keys({
    watchedAt: Joi.string().pattern(/(\d{2})\/?(\d{2})?\/(\d{4})/)
      .messages({
        'string.pattern.base': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        'any.required': 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      }).required(),
    rate: Joi.number().integer().min(1).max(5)
      .messages({
        'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
        'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
        'any.required': 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      })
      .required(),
  }).required().messages({
    'any.required': 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  }),
});

const validateMiddleware = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = validateMiddleware;
