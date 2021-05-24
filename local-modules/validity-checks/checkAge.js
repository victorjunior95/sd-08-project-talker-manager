const checkAge = (age, res) => {
  if (!age && parseInt(age, 10) !== 0) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
    return false;
  }

  if (age && parseInt(age, 10) < 18) {
    res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
    return false;
  }
  return true;
};

module.exports = checkAge;
