const BAD_REQUEST = 400;

const ageValidation = (request, respose, next) => {
  const { age } = request.body;

  if (!age) {
    return respose.status(BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (Number(age) < 18) {
    return respose.status(BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  
  next();
};

module.exports = ageValidation;
