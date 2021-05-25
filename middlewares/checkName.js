const NOME_ERRADO = 400;
const TRES = 3;

const testeNome = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(NOME_ERRADO)
      .send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < TRES) {
    return res.status(NOME_ERRADO)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

module.exports = testeNome;
