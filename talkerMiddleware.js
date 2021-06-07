const validateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if(!token) {
    return res.status(401).send({ "message": "Token não encontrado" });
  };

  const tokenIsValid = (token.length === 16) ? true : false;

  if(!tokenIsValid) {
    return res.status(401).send({ "message": "Token inválido" });
  };

  next();
}

const validateName = (req, res, next) => {
  const { name } = req.body;
  
  if(!name) {
    return res.status(400).send({ "message": "O campo \"name\" é obrigatório" });
  };

  const nameIsValid = (name.length >= 3) ? true : false;

  if(!nameIsValid) {
    return res.status(400).send({ "message": "O \"name\" deve ter pelo menos 3 caracteres" });
  };

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  
  if(!age) {
    return res.status(400).send({ "message": "O campo \"age\" é obrigatório" });
  };

  const ageIsValid = (age >= 18) ? true : false;

  if(!ageIsValid) {
    return res.status(400).json({ "message": "A pessoa palestrante deve ser maior de idade" });
  };

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  
  if(!talk || !talk.watchedAt || !talk.hasOwnProperty('rate')) {
    return res.status(400).send({ "message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios"});
  };

  const dateIsValid = re.test(talk.watchedAt);
  
  if(!dateIsValid) {
    return res.status(400).send({ "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"" });
  };
  
  const rateIsValid = (talk.rate >= 1 && talk.rate <= 5) ? true : false
  
  if(!rateIsValid) {
    return res.status(400).send({ "message": "O campo \"rate\" deve ser um inteiro de 1 à 5" });
  };

  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateToken
};
