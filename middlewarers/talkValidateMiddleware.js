const BAD_REQUEST = 400;

const getTalkField = (request, response, next) => {
  const { talk } = request.body;
  if (!talk) {
    return response
      .status(BAD_REQUEST)
      .json({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  return next();
  // return response.status(200);
};

module.exports = { getTalkField };
