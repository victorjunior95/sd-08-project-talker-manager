const joi = require('joi');

const token = joi
  .string()
  .pattern(/^\w{16}$/)
  .required();

module.exports = token;
