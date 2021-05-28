const validEmptyFields = (req, res, next) => {
  const msg = { 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };
  if (typeof req.body.talk !== 'object') return res.status(400).json(msg);
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const validTalkerData = [{ name }, { age }, { watchedAt }, { rate }].find((validate) => {
    const [value] = Object.values(validate);
    return (!value);
  });
  if (validTalkerData) {
    const field = Object.keys(validTalkerData)[0];
    if (field === 'watchedAt' || field === 'rate') return res.status(400).json(msg);

    return res.status(400).json({ message: `O campo "${field}" é obrigatório` });
  }
  next();
};

module.exports = validEmptyFields;