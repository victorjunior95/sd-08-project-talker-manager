const readfile = require('../Services/readfile');

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

module.exports = (req, res) => {
  const talker = req.body;
  const auth = req.headers.authorization;
  console.log(auth);

  verifyToken(auth, res);
  verifyName(talker.name, res);
  verifyAge(talker.age, res);
  verifyEmptyTalk(talker.talk, res);
};