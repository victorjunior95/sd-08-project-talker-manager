const verifyName = (name, res) => {
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const verifyAge = (age, res) => {
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const verifyDateFormat = ({ watchedAt }, res) => {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const verifyRate = ({ rate }, res) => {
  if (rate > 5 || rate < 1) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const verifyDateAndRate = (talk, res) => {
  if (!talk || !(talk.watchedAt) || !(talk.rate)) {
    return res
      .status(400)
      .json({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  verifyDateFormat(talk, res);
  verifyRate(talk, res);
};

module.exports = {
  verifyName,
  verifyAge,
  verifyDateAndRate,
};
