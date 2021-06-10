module.exports = (req, res, next) => {
   const { rate } = req.body.talk;
   if (!rate || typeof rate !== 'number') {
       next();
   }
   if (rate < 1 || rate > 5) {
       return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
   }
   next();
};