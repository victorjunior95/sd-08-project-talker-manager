const readfile = require('../Services/readfile');
const writeInFile = require('../Services/writeInFile');

const verifyToken = (token, res) => {
  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16)res.status(401).json({ message: 'Token inválido' }); 
};
const verifyName = (name, res) => {
  if (!name) res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
  res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
};
const verifyAge = (stringAge, res) => {
  const age = Number(stringAge);
  if (!age) res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
};

const verifyEmptyTalk = (talk, res) => {
  if (!talk) {
  res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
  }
  if (!talk.watchedAt) {
  res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
  }
  if (!talk.watchedAt) {
  res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
  }
};
const verifyTalk = (talk, res) => {
  const rate = Number(talk.rate);
  const validDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  if (!validDate.test(talk.watchedAt)) {
  return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  if (rate < 1 || rate > 5) {
  return res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
};

module.exports = (req, res) => {
  const talker = req.body;
  const auth = req.headers.authorization;

  verifyToken(auth, res);
  verifyName(talker.name, res);
  verifyAge(talker.age, res);
  verifyEmptyTalk(talker.talk, res);
  verifyTalk(talker.talk, res);

  readfile()
  .then((data) => [...data, { id: data.length, ...talker }])
  .then((data) => {
    writeInFile('talker.json', JSON.stringify(data));
    res.status(201).json(data[data.length - 1]);
  });
};