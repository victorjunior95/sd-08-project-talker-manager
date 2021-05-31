const validateData = (date) =>
  /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(date);

const BAD_REQUEST = 400;

const getData = (request, response, next) => {
  const { talk } = request.body;
  const IsValidWatchedAt = validateData(talk.watchedAt);
  // if (!talk.watchedAt) {
  //   return response.status(BAD_REQUEST).json({
  //     message:
  //       'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  //   });
  // }
  if (!IsValidWatchedAt) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

module.exports = { getData };
