const verifyName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const verifyDateFormat = (req, res) => {
  const { talk: { watchedAt } } = req.body;

  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const verifyRate = (req, res) => {
  const { talk: { rate } } = req.body;

  if (rate > 5 || rate < 1) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const verifyTalk = (talk, res) => {
  if (!(talk)) {
    return res
    .status(400)
    .json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
};

const verifyTalkWatched = ({ watchedAt }, res) => {
  if (!(watchedAt)) {
    return res
    .status(400)
    .json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
};

const verifyTalkRate = ({ rate }, res) => {
  if (!(rate)) {
    return res
    .status(400)
    .json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
};
const verifyDateAndRate = (req, res, next) => {
  const { talk } = req.body;

  const isNotTalk = verifyTalk(talk, res);
  const isNotWatched = verifyTalkWatched(talk, res);
  const isNotRate = verifyTalkRate(talk, res);

  if (isNotTalk) return isNotRate;
  if (isNotWatched) return isNotWatched;
  if (isNotRate) return isNotRate;
  
  verifyDateFormat(req, res);
  verifyRate(req, res);
  next();
};

module.exports = {
  verifyName,
  verifyAge,
  verifyDateAndRate,
};
