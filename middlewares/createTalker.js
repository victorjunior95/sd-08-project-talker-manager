const fs = require('fs');

function validityToken(req, _res, next) {
  if (req.body.token && req.body.token.length === 16) {
    next();
  } else if (req.body.token && req.body.token.length < 16) {
    next({ status: 401, message: 'Token inválido' });
  } else {
    next({ status: 401, message: 'Token não encontrado' });
  }
}

function validityNameTalker(req, _res, next) {
  const talker = req.body;
  if (!talker.name) {
    next({ status: 400, message: 'O campo "name" é obrigatório' });
  } else if (talker.name.length < 3) {
    next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else {
    next();
  }
}

function validityAgeTalker(req, _res, next) {
  const talker = req.body;
  if (!talker.age) {
    next({ status: 400, message: 'O campo "age" é obrigatório' });
  } else if (talker.age < 18 || talker.age % 1 !== 0 || typeof talker.age !== 'number') {
    next({ status: 400, message: 'A pessoa palestrante deve ser maior de idade' });
  } else {
    next();
  }
}

function validityTalk(req, _res, next) {
  const talker = req.body;
  const { talk } = talker;
  if (!talk || !talk.watchedAt || !talk.rate) {
    next({
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  } else {
    next();
  }
}

function validityWatchedAtTalker(req, _res, next) {
  const talker = req.body;
  const { talk } = talker;
  const rgx = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g); // https://www.regextester.com/99555
  if (!talk.watchedAt || !talk.watchedAt.match(rgx)) {
    next({ status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else {
    next();
  }
}

function validityRateTalker(req, _res, next) {
  const talker = req.body;
  const { rate } = talker.talk;
  if (typeof rate === 'string' || Number(rate) % 1 !== 0 || Number(rate) > 5) {
    next({ status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } else {
    next();
  }
}

function createTalker(req, res, next) {
  const PATH_FILE = './talker.json';
  const talker = req.body;
  try {
    // const data = fs.readFileSync(PATH_FILE, 'utf-8');
    // const newData = JSON.parse(data).concat(talker);
    fs.writeFile(PATH_FILE, talker, (err) => {
      if (err) next(err);
      console.log('Saved!');
    });
    res.status(201).json(talker);
  } catch (err) {
    next(err);
  }
}

module.exports = [
  validityToken,
  validityNameTalker,
  validityAgeTalker,
  validityTalk,
  validityWatchedAtTalker,
  validityRateTalker,
  createTalker,
];
