const express = require('express');

const router = express.Router();

const middleware = require('../middlewares');

router.post('/', middleware.login);

module.exports = router;

// Express Router
// https://expressjs.com/pt-br/guide/routing.html
