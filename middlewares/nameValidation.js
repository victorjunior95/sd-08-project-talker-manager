const BAD_REQUEST = 400;

const nameValidation = (request, respose, next) => {
  const { name } = request.body;

  if (!name) {
    return respose.status(BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return respose.status(BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = nameValidation;
