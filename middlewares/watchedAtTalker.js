const watchedAtTalker = ((request, response, next) => {
  const { watchedAt } = request.body.talk;
  const regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  
  if (!regex.test(watchedAt)) {
    return response.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
});

module.exports = watchedAtTalker;
