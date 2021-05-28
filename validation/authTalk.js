/* verifica idade da req */
const nota = /[2-5]/;
const authtalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (talk === undefined || talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  } if (!nota.test(talk.rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    } next();
};

module.exports = authtalk;