const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const desafio04 = require('./desafio4');

router.post('/', rescue(async (req, res, next) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;

  const addTalker = await desafio04.addTalker(name, age, talk, authorization);
  const { message, code, err } = addTalker;

  if (err) return next(err);

  return res.status(code).json(message);
}));

router.use((err, _req, res, _next) => {
  const { message, code } = err;

  return res.status(code).json({ message });
});

module.exports = router;