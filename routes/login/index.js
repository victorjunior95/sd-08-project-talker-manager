const express = require('express');

const router = express.Router();

const middlewares = require('../../middlewares');

router.post('/', middlewares.login);

module.exports = router;
