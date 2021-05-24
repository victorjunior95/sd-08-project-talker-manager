const messages = {
  ageNotFound: 'O campo "age" é obrigatório',
  ageLessThan: 'A pessoa palestrante deve ser maior de idade',
};

module.exports = (req, res, next) => {
  const { age } = req.body;
  const nimAge = 18;

  if (age === undefined || age.toString().length === 0) {
    return res.status(400).json({ message: messages.ageNotFound });
  }
  if (age < nimAge) return res.status(400).json({ message: messages.ageLessThan });
  next();
};
