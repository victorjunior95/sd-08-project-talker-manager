const { nameError, nameEmputy, ageEmputy, ageError,
  dataError, rateError, talkEmput, emptyEmail,
  ivalidEmail, emptyPassword, passwordLength } = require('../helpers/errorMessages');

// Raciocinio regex encontrado em: https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656/2
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const validateAge = (req, resp, next) => {
    const { age } = req.body;
    if (!age) return resp.status(400).send(ageEmputy);
    if (age < 18) return resp.status(400).send(ageError);
    next();
};

const ValidateEmail = (req, resp, next) => {
    const { email } = req.body;

    if (!email) return resp.status(400).send(emptyEmail);
    if (!regexEmail.test(email)) return resp.status(400).send(ivalidEmail);
    next();
};

const validateName = (req, resp, next) => {
    const { name } = req.body;

    if (!name) return resp.status(400).send(nameEmputy);
    if (name.length < 3) return resp.status(400).send(nameError);
    next();
};

const validPassword = (req, resp, next) => {
    const { password } = req.body;

    if (!password) return resp.status(400).send(emptyPassword);
    if (password.length < 6) return resp.status(400).send(passwordLength);
    next();
};

const validateObjData = (req, resp, next) => {
    const { talk } = req.body;
    if (!talk || Object.keys(talk).length < 2) return resp.status(400).send(talkEmput);
    if (!patternData.test(talk.watchedAt)) return resp.status(400).send(dataError);
    next();
};

const validateRate = (req, resp, next) => {
    const { talk } = req.body;
    if (talk.rate < 1 || talk.rate > 5) return resp.status(400).send(rateError);
    next();
};

module.exports = {
    validateAge,
    ValidateEmail,
    validateName,
    validPassword,
    validateObjData,
    validateRate,
};
