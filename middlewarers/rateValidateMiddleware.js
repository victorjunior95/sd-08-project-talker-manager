const validateRate = (rate) => {
  const MIN = 1;
  const MAX = 5;
  return rate >= MIN && rate <= MAX;
};

const BAD_REQUEST = 400;

const getRate = (request, response, next) => {
  const { talk } = request.body;
  const IsValidRate = validateRate(talk.rate);

  if (!talk.rate) {
    return response.status(BAD_REQUEST).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!IsValidRate) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return next();
};

module.exports = { getRate };
