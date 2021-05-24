const messages = {
  nameRequire: 'O campo "name" é obrigatório',
  nameNimOf: 'O "name" deve ter pelo menos 3 caracteres',
};

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (name === undefined || name.length === 0) {
    return res.status(400).json({ message: messages.nameRequire });
  }
  if (name.length < 3) return res.status(400).json({ message: messages.nameNimOf });
  next();
};
