const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('../middlewares');
const utils = require('../utils');

const router = express.Router();
router.use(bodyParser.json());

router.use(middlewares.authLogin);

router.post('/', (req, res) => {
  const token = utils.generateToken();
  res.status(200).send({ token });
});

module.exports = router;