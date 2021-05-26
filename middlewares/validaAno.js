const validaAno = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  } 
  if (typeof age !== 'number' || age < 18) {
    res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = validaAno;