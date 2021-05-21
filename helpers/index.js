const checkToken = (token, response) => {
  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (typeof token !== 'string' || token.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
};

const checkName = (name, response) => {
  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.lenth < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const checkTalk = (talk, response) => {
  if (!talk || talk === {} || !talk.watchedAt || !talk.rate) {
    return response
      .status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
  }
};

const checkAge = (age, response) => {
  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const checkTalWatchedAt = (watchedAt, response) => {
// TODO
};

const checkTalkRate = (rate, response) => {
  if (typeof rate !== 'number' || rate < 1 || rate > 5) {
    return response.status(400)
      .json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
  }
};

module.exports = {
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalWatchedAt,
  checkTalkRate,
};
