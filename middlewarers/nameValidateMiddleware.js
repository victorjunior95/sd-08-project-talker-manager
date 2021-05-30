const validateName = (name) => {
  const MIN_LENGTH = 3;
  return String(name).length >= MIN_LENGTH;
};

const BAD_REQUEST = 400;

const getName = (request, response, next) => {
  const { name } = request.body;
  const IsValidName = validateName(name);
  if (!name) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (!IsValidName) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  return next();
  //   return response.status(200)
};

module.exports = { getName };
