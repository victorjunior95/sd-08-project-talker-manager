const verifyToken = (token, res) => {
  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
    return true;
  }
  if (token.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
    return true;
  }
  return false;
};
const verifyName = (name, res) => {
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
    return true;
  }
  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
    return true;
  }
  return false;
};
const verifyAge = (stringAge, res) => {
  const age = Number(stringAge);
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
    return true;
  }
  if (age < 18) {
    res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
    return true;
  }
  return false;
};
const verifyEmptyTalk = (talk, res) => {
  if (!talk) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
    return true;
  }
  if (!talk.watchedAt) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
    return true;
  }
  if (!talk.rate && talk.rate !== 0) {
  res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
    return true;
  }
  return false;
};
const verifyTalk = (talk, res) => {
  const rate = Number(talk.rate);
  const validDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!validDate.test(talk.watchedAt)) {
  res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
    return true;
  }
  if (rate < 1 || rate > 5) {
  res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
    return true;
  }
  return false;
};

module.exports = {
  verifyToken,
  verifyName,
  verifyAge,
  verifyEmptyTalk,
  verifyTalk,
};