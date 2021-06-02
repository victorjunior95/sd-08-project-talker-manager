const express = require('express');
const rescue = require('express-rescue');

const desafio07 = require('./desafio7');

const router = express.Router();

router.get('/search', rescue(async (req, res, next) => {
  const { q } = req.query;
  const { authorization } = req.headers;
  const searchTeam = await desafio07.searchTeamByName(q, authorization);
  const { message, code, err, arr } = searchTeam;
 
  if (arr) return res.status(arr.codein).json(arr.messagein);
  if (err) return next(err);

  return res.status(code).json(message);
}));

router.use((err, _req, res, _next) => {
  const { message, code } = err;

  res.status(code).json({ message });
});

module.exports = router;
