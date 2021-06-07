const express = require('express');
const rescue = require('express-rescue');
const crypto = require('crypto');

const { validateEmail, validatePassword } = require('./authMiddleware');

const router = express.Router();

/*
------------------------- ROUTERS ---------------------------
*/

router.post('/', validateEmail, validatePassword, rescue(async (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).send({ token });
}));

/*
------------------------- ROUTERS ---------------------------
*/

module.exports = router;
