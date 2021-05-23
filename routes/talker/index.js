const express = require('express');
const rescue = require('express-rescue');
const lerPalestrantes = require('../../utils');

const router = express.Router();

router.get('/', rescue(async (_req, res, _next) => {
  const talkers = await lerPalestrantes();
  console.log(talkers);
  res.status(200).json(talkers);
}), (_err, _req, res, _next) => {
  res.status(200).send([]);
});

module.exports = router;
