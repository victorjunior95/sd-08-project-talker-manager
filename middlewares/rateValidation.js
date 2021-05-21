const BAD_REQUEST = 400;

const rateValidation = (request, respose, next) => {
  const { talk: { rate } } = request.body;

  if (rate < 1 || rate > 5) {
    return respose.status(BAD_REQUEST).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = rateValidation;
