function isAnyoneUndefined(arg) {
  if (typeof arg === 'object') {
    const { watchedAt, rate } = arg;
    return [watchedAt, rate].some((prop) => typeof prop === 'undefined');
  }
  return !arg;
}

module.exports = (req, _res, next) => {
  const { talk } = req.body;
  if (isAnyoneUndefined(talk)) {
    return next({
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const { watchedAt, rate } = talk;
  const watchedRegex = /\d{2}\/\d{2}\/\d{4}/g;

  if (!watchedRegex.test(watchedAt)) {
    return next({ status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (rate < 1 || rate > 5) {
    return next({ status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};
