const BAD_REQUEST = 400;

const watchedAtValidation = (request, respose, next) => {
  const { talk: { watchedAt } } = request.body;

  // https://qastack.com.br/programming/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  const dataValid = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!(dataValid.test(watchedAt))) {
    return respose.status(BAD_REQUEST).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = watchedAtValidation;
