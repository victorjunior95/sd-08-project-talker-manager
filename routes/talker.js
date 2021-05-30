const express = require('express');

const router = express.Router();

const readTalker = require('../services/readTalker');

// router.use('/', (req, res, next) => {
//   console.log('Entrei no talker');
//   next();
// });

router.get('/', (req, res, _next) => {
  console.log(readTalker);
  if (readTalker) return res.status(200).json(JSON.parse(readTalker()));
  return res.status(200).json([]);
});

module.exports = router;
