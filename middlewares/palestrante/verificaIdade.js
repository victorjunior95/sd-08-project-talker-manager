const verificaIdade = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    response.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    response.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = verificaIdade;
