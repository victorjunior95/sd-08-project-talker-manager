const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../utils');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (_req, res) => {
  const talkers = await utils.getTalkers('talker.json');
  res.status(200).send(talkers);
});

module.exports = router;