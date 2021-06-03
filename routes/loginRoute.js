const express = require('express');

const router = express.Router();

const {
  authpaswd,
  authemail,
} = require('../validation');

// req-3
router.post('/', authpaswd, authemail, (req, res) => {
  res.status(200).send({ token: (Math.random()).toString(2).substring(2, 18) }); 
 });

module.exports = router;
