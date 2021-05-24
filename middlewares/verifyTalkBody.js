// Reference: https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656/2
const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const verifyTalkBody = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  if (!patternData.test(watchedAt)) {
    res.status(400)
    .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (typeof rate === 'number' && (rate < 1 || rate > 5)) {
    res.status(400)
    .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = verifyTalkBody;
