// referencia: Karine --> https://github.com/ana-karine
const crypto = require('crypto');

const checkValidityEmail = (email) =>
  /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/i.test(email);
//   /^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/.test(
// email,
//   );

const checkValidityPassword = (pwd) => {
  const LENGTH_PWD = 6;
  return String(pwd).length >= LENGTH_PWD;
};

const tokenGenerator = () => {
  const token = crypto.randomBytes(8).toString('hex');
  //   const randomstring = Math.floor(
  //     Math.random() * 9999999999999999999999999,
  //   ).toString(36);
  return token;
};

module.exports = { checkValidityEmail, checkValidityPassword, tokenGenerator };
