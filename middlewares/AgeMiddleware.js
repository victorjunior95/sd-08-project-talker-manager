module.exports = (request, response, next) => {
  const { age } = request.body;

  if (!age) {
    response.status(400).send({ message: 'O campo "age" é obrigatório' });
  } else if (age < 18) {
    response.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  
  return next();
}; 