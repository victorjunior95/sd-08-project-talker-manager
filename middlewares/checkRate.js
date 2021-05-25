const DADO_ERRADO = 400;

const checkRate = (req, resp, next) => {
  const { talk: { rate } } = req.body;
  if (typeof rate !== 'number' || rate < 1 || rate > 5) {
    return resp.status(DADO_ERRADO).send({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
  }
  next();
};

module.exports = checkRate;
