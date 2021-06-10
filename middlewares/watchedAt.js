const validade = require('../services/validate');

module.exports = (req, res, next) => {
   const { watchedAt } = req.body.talk;
   const verifyDate = validade.date(watchedAt);
   if (!verifyDate) {
       return res.status(400).json({ 
           message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
   }
   next();
};