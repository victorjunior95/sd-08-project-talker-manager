const verificaNome = (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    response.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    response.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

module.exports = verificaNome;
