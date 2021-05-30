module.exports = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const msg = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  if (rate === 0 || rate < 1 || rate > 5) {
 return res.status(400)
    .json(msg); 
}
  next();
};
