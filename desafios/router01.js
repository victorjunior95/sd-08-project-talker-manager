const express = require('express');
const rescue = require('express-rescue');

const desafio01 = require('./desafio01');

const router = express.Router();

router.get('/', rescue(async (_req, res) => {
  const readTalkers = await desafio01();
  res
    .status(200)
    .json(readTalkers);
  }),
  (_err, _req, res, _next) => {
    res
      .status(200)
      .json([]);
});

module.exports = router;