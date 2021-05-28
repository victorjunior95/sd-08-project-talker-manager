/* verifica idade da req */
const authtalk = (req, res, next) => {
  const { talk } = req.body;
  const regxp = /[1-3][0-9]\/[0-1][0-9]\/[0-2][0-9][0-9][0-9]/;
  const nota = /[1-5]/;
  console.log(req.body);
  if (!regxp.test(talk.watchedAt)) {
    return res.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  } if (!nota.test(talk.rate)) {
      return res.status(400).json(
        { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  } if (!talk.watchedAt) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
  );
}
  next();
};

module.exports = authtalk;