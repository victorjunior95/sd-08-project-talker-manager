module.exports = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
        res.status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    } return next();
};