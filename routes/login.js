const validator = require('email-validator');
const rescue = require('express-rescue');
const token = require('../services/token');

const login = rescue(async (req, res) => {
        const { email, password } = req.body;
        const validation = await validator.validate(email);
        if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
        if (!validation) {
       return res
        .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
      }
        
        if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
        if (password.toString().length < 6) {
       return res
        .status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
      }
        
      return res.status(200).json({ token: token() });
});

module.exports = login;