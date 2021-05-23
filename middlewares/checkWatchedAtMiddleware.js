module.exports = (request, response, next) => {
  const { watchedAt } = request.body.talk;
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const isValidDate = dateRegex.test(watchedAt);
  if (!isValidDate) {
    return response.status(400).json({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};
