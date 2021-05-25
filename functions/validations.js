// Solução e raciocinio regex encontrado em: https://ui.dev/validate-email-address-javascript/
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const { emptyEmail, passwordLength, emptyPassword, ivalidEmail } = require('./erros');

function validateEntries(email, password) {
  if (!email) return emptyEmail;
  if (!password) return emptyPassword;
  if (!regexEmail.test(email)) return ivalidEmail;
  if (password.length < 6) return passwordLength;
  return true;
}

module.exports = {
  validateEntries,
};
