const express = require('express');
const {
  validateEmail,
  validatePassword,
  getToken,
} = require('../utils/authentication');

const router = express.Router();

router.post('/', (_req, res) => {
  const { email, password } = _req.body;
  const validEmail = validateEmail(email);
  const validPassword = validatePassword(password);
  const token = getToken(email, password);
  if (validEmail !== true) {
    return res.status(400).send(validEmail);
  }
  if (validPassword !== true) {
    return res.status(400).send(validPassword);
  }
  if (validEmail === true && validPassword === true) {
    return res.status(200).send({ token });
  }
});

module.exports = router;
