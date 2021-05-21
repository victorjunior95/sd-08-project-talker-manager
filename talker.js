const express = require('express');
// const bodyParser = require('body-parser');

const fsTalker = require('./fsTalker.js');

const fileToRead = './talker.json';

const router = express.Router();

router.get('/', async (_req, res) => {
  const result = await fsTalker(fileToRead);
  console.log(result);
  if (!result) {
    return res.status(401);
  }
  return res.status(200).json(result);
});

module.exports = router;
