const checkName = (name, res) => {
  if (!name) {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
    return false;
  }

  if (name && name.length < 3) {
    res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    return false;
  }
  return true;
};

module.exports = checkName;
