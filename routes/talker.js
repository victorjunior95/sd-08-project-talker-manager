const express = require('express');
const readFile = require('../readFile');

const SUCCESS_STATUS = 200;
const router = express.Router();
const fileName = 'talker.json';

router.get('/', (_req, res) => {
  readFile(fileName).then((data) => {
    res.status(SUCCESS_STATUS).send(data);
  });
});

module.exports = router;
