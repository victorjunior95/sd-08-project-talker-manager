module.exports = (request, response, next) => {
  const { rate } = request.body.talk;

  if (rate <= 0 || rate > 5) {
    return response.status(400)
    .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};
