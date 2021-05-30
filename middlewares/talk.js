const validateDate = require('validate-date');

module.exports = async (req, res, next) => {
    const { talk, talk: { watchedAt, rate } } = req.body;
    const validDate = validateDate(watchedAt, '', 'dd/mm/yyyy'); 
    if (validDate !== 'Valid Date') {
 return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
} 
    console.log(typeof rate);
    if (Number(rate) > 0 && Number(rate) < 4) {
 return res
    .status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
 } 
    if (!talk) {
 return res.status(400)
 .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
}); 
} 
next();
};