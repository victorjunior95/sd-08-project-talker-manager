const express = require('express');
const rescue = require('express-rescue');

const desafio05 = require('./desafio5');

const router = express.Router();

router.put('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const paramentros = { id: +id, name, authorization, age, talk };

  const updateTalker = await desafio05.updateOne(paramentros);
  const { message, code, err } = updateTalker;

  if (err) return next(err);

  return res.status(code).json(message);
}));

router.use((err, _req, res, _next) => {
  const { message, code } = err;
  
  return res.status(code).json({ message });
});

module.exports = router;
