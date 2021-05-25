const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.send(400).send({ message: 'O campo "name" é obrigatório' });
    return;
  }
  if (name.length < 3) {
    res.send(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    return;
  }
  next();
};

module.exports = validateName;