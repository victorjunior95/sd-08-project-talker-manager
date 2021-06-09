function validToken(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (token.length !== 16) {
    return res.status(400).send({
      message: 'Token inválido',
    });
  }
  next();
}

function validNameAndAge(req, res, next) {
  const newTalker = req.body;
  const { name, age } = newTalker;
  if (!name) {
    return res.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (!age) {
    return res.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  }
  next();
}

function validTalker(req, res, next) {
  const newTalker = req.body;
  const {
    talk: { watchedAt, rate },
  } = newTalker;
  const dateFormat = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (!dateFormat.test(watchedAt)) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

module.exports = {
  validNameAndAge,
  validToken,
  validTalker,
};
