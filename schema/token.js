const joi = require('joi');

module.exports = joi
  .string()
  .pattern(/^\w{16}$/)
  .required();
