module.exports = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5 || !Number.isInteger(talk.rate)) {
 return res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
}
  next();
};