const validateAge = (age) => {
  const MIN_AGE = 18;
  const receivedAge = age;
  return +receivedAge >= MIN_AGE;
};

const BAD_REQUEST = 400;

const getAge = (request, response, next) => {
  const { age } = request.body;
  const IsValidAge = validateAge(age);
  if (!age) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (!IsValidAge) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  return next();
  //   return response.status(200)
};

module.exports = { getAge };
