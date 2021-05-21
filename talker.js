const express = require('express');
// const bodyParser = require('body-parser');

const router = express.Router();

const getFsTalker = require('./fsFile.js');

router.get('/', async (_req, res) => {
  const content = await getFsTalker();
  console.log(content);
  if (!content) {
    return res.status(401);
  }
  return res.status(200).json(content);
});

module.exports = router;
