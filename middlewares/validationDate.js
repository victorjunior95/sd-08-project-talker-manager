module.exports = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
   const validDate = dateRegex.test(watchedAt);
   if (!validDate) {
    res.status(400)
.json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
} return next();
};