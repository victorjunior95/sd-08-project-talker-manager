const IDADE_ERRADO = 400;
const IDADE_MINIMA = 18;

const testeIdade = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(IDADE_ERRADO).send({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < IDADE_MINIMA) {
    return res.status(IDADE_ERRADO)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = testeIdade;
