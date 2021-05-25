const { req4Responses: { nameNAgeRes } } = require('./JsonResponseMessages.json');

const nameAgeValidation = (req, res, next) => {
const { body: { name, age } } = req;
// O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
// Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo: { "message": "O campo \"name\" é obrigatório" }
if (!name) return res.status(400).send(nameNAgeRes[0]);
// Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400, com o seguinte corpo: { "message": "O \"name\" deve ter pelo menos 3 caracteres" }
if (name.length < 3) return res.status(400).send(nameNAgeRes[1]);
// O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.
// Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo: { "message": "O campo \"age\" é obrigatório" }
if (!age) return res.status(400).send(nameNAgeRes[2]);
// Caso a pessoa palestrante não tenha pelo menos 18 anos retorne status 400, com o seguinte corpo: { "message": "A pessoa palestrante deve ser maior de idade" }
if (age < 18) return res.status(400).send(nameNAgeRes[3]);
next();
};

module.exports = { nameAgeValidation };
