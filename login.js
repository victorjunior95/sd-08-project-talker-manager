const express = require('express');
const rescue = require('express-rescue');
const crypto = require('crypto');

const { validateEmail, validatePassword } = require('./validations/credentialsValidation');

const router = express.Router();

router.post('/', validateEmail, validatePassword, rescue(async (_, res) => {
    const token = crypto.randomBytes(8).toString('hex');

    res.send({ token });
}));

module.exports = router;