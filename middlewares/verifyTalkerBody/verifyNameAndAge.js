module.exports = (req, _res, next) => {
  const { name, age } = req.body;
  if (!name) return next({ status: 400, message: 'O campo "name" é obrigatório' });
  if (!age) return next({ status: 400, message: 'O campo "age" é obrigatório' });

  if (name.length < 3) {
    return next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (age < 18) {
    return next({ status: 400, message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
