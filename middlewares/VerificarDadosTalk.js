/** Source: https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656 */
const reg = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const verificarDadosTalk = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;

  if (!reg.test(watchedAt)) {
    res.status(400)
    .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  if (rate < 1 || rate > 5) {
    res.status(400)
    .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = verificarDadosTalk;
