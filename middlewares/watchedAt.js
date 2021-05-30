const isDateValid = (date) => /^\d{2}\/\d{2}\/\d{4}$/g.test(date);

module.exports = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (!isDateValid(watchedAt)) {
 return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}     
next();
};