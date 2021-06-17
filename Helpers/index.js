const talkers = require('./talkers');
const token = require('./token');
const errorHandler = require('./errorHandler');
const express = require('./express');

module.exports = {
  errorHandler,
  express,
  talkers,
  token,
};
