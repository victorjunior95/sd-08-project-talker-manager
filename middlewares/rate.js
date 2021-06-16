module.exports = (request, response, next) => {
  const { rate } = request.body.talk;
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}; 
