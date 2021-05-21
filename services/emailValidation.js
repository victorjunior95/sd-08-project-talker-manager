// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const emailValidation = (email) => /\S+@\S+\.\S+/.test(email);

module.exports = emailValidation;
