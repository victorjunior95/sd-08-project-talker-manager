module.exports = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  const ageInt = parseInt(age, 10);
  if (ageInt < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
