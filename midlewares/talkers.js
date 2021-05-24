const express = require('express');

const fs = require('fs');

const router = express.Router();

const content = fs.readFile('./talkers.json');

router.get('/talker', (req, res) => {
  res.send(`${content}`);
});

module.exports = router;