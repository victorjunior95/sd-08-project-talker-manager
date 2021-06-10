const crypto = require('crypto');
const validate = require('../services/validate');

module.exports = (req, res) => {
    const { email, password } = req.body;
    const tokenNumber = crypto.randomBytes(8).toString('hex');
    const verifyEmail = validate.email(email);
    const verifyPassword = validate.password(password);
    
    if (typeof verifyEmail === 'object') {
        return res.status(400).send(verifyEmail);
    }
    if (typeof verifyPassword === 'object') {
        return res.status(400).send(verifyPassword);
    }
    return res.status(200).json({ token: tokenNumber });
};