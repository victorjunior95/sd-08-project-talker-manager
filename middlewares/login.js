const crypto = require('crypto');

module.exports = (req, res) => {
    const { email, password } = req.body;
    const verifyEmail = /.+@[A-z]+[.]com/.test(email);
    if (!email) {
       return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (!verifyEmail) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
};