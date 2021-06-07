const fs = require('fs');
const Helpers = require('./helpers');

const talkerFile = './talker.json';

// const regexDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;

function getAll(req, _res, next) {
  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
  if (talker.length === 0) {
    req.talker = [];
    return next();
  }
  req.talker = talker;
  next();
}

function getById(req, res, next) {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const findTalker = talkers.find((talker) => talker.id === Number(id));
  if (findTalker) {
    req.talker = findTalker;
    return next();
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}

function createTalker(req, res, next) {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  const validRateAndDate = Helpers.validateRateAndDate(talk);
  if (validRateAndDate.message) return res.status(400).json({ message: validRateAndDate.message });
  const validNameAndAuthor = Helpers.validateAuthAndName(name, authorization);
  const validAge = Helpers.validateAge(age);
  if (validNameAndAuthor.message) {
  return res.status(validNameAndAuthor.code)
  .json({ message: validNameAndAuthor.message }); 
}
  if (validAge.message) return res.status(400).json({ message: validAge.message });
  let talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
  const newId = talkers.length === 0 ? 1 : talkers.length + 1;
  talkers = [...talkers, { id: newId, ...req.body }];
  fs.writeFileSync(talkerFile, JSON.stringify(talkers));

  req.talker = { id: newId, ...req.body };
  return next();
}

function update(req, res, next) {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const validRateAndDate = Helpers.validateRateAndDate(talk);
  if (validRateAndDate.message) return res.status(400).json({ message: validRateAndDate.message });
  const validNameAndAuthor = Helpers.validateAuthAndName(name, authorization);
  const validAge = Helpers.validateAge(age);
  if (validNameAndAuthor.message) {
    return res.status(validNameAndAuthor.code)
    .json({ message: validNameAndAuthor.message }); 
  }
  if (validAge.message) return res.status(400).json({ message: validAge.message });
  const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
  let updatedTalkers = Helpers.filterTalkers(talkers, id);
  updatedTalkers = [...updatedTalkers, { id: Number(id), ...req.body }];
  fs.writeFileSync(talkerFile, JSON.stringify(updatedTalkers));
  req.updatedTalker = { id: Number(id), ...req.body };
  return next();
}

function deleteTalker(req, res, next) {
  const { authorization } = req.headers;
  const { id } = req.params;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
  const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
  let updatedTalkers = Helpers.filterTalkers(talkers, id);
  updatedTalkers = [...updatedTalkers];
  fs.writeFileSync(talkerFile, JSON.stringify(updatedTalkers));

  next();
}

function findByQuery(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
  const query = req.query.q;
  let talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
  talkers = talkers.filter((talker) => talker.name.includes(query));
  req.talkers = talkers;
  next();
}

const erroHandlerMiddleware = (err, _req, res, _next) => {
  res.send(err.stack);
};

module.exports = {
  getAll,
  getById,
  erroHandlerMiddleware,
  createTalker,
  update,
  deleteTalker,
  findByQuery,
};
