const express = require('express');
const bodyParser = require('body-parser');
// const talkers = require('../services');

const router = express.Router();

// const app = express();

router.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

router.get('/', (req, res) => res.status(HTTP_OK_STATUS).send('LOGIN'));

module.exports = router;
