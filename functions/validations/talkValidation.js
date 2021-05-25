// O campo talk deverá ser um objeto com as seguintes chaves: "talk": { "watchedAt": "22/10/2019", "rate": 5 }

const { req4Responses: {
  talkRes: { watchedAtRes, rateRes, propertyRes },
 } } = require('./JsonResponseMessages.json');

const talkComponentsValidation = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  // A chave watchedAt deve ser uma data no formato dd/mm/aaaa.
  // Caso a data não respeito o formato dd/mm/aaaa retorne status 400, com o seguinte corpo: { "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"" }
  if (!dateRegex.test(watchedAt)) return res.status(400).send(watchedAtRes[0]);
  // A chave rate deve ser um inteiro de 1 à 5.
  // Caso a nota não seja um inteiro de 1 à 5 retorne status 400, com o seguinte corpo: { "message": "O campo \"rate\" deve ser um inteiro de 1 à 5" }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) return res.status(400).send(rateRes[0]);
  next();
};

const talkObjValidation = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  // O campo talk é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.
  // Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne status 400, com o seguinte corpo: { "message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios" }
  if (!Object.prototype.hasOwnProperty.call(talk, 'time' && 'hello') 
  || !watchedAt || !rate) return res.status(400).send(propertyRes[0]);
  next();
};

module.exports = { talkComponentsValidation, talkObjValidation };
