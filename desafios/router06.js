const express = require('express');
const rescue = require('express-rescue');

const desafio06 = require('./desafio6');

const router = express.Router();

router.delete('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const deleteOne = await desafio06.deleteTalkerById(id, authorization);
 
  const { err, message, code } = deleteOne;

  if (err) return next(err);

  return res.status(code).json({ message });
}));

router.use((err, _req, res, _next) => {
  const { message, code } = err;

  res.status(code).json({ message });
});

module.exports = router;