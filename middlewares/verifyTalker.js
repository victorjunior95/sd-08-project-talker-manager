function verifyName(res, name) {
  if (name === undefined) {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function verifyAge(res, age) {
  if (age === undefined) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number' || age < 18) {
    res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
}

function verifyTalk(res, talk) {
  if (talk === undefined) {
    return res.status(400).send(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  const { watchedAt, rate } = talk;
  if (watchedAt === undefined || rate === undefined) {
    return res.status(400).send(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
}

function verifyTalk2(res, talk) {
  const { watchedAt, rate } = talk;
  const filter = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (filter.test(watchedAt) === false) {
    res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (typeof rate === 'number' && (rate < 1 || rate > 5)) {
    res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

module.exports = (req, res, next) => {
  const { name, age, talk } = req.body;
  verifyName(res, name);
  verifyAge(res, age);
  verifyTalk(res, talk);
  verifyTalk2(res, talk);
  next();
};
