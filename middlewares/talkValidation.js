const BAD_REQUEST = 400;

const talkValidation = (request, respose, next) => {
  const { talk } = request.body;

  if (!talk || !talk.watchedAt || typeof talk.rate !== 'number') {
    return respose.status(BAD_REQUEST).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

module.exports = talkValidation;
