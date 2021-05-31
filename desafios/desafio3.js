/* pesquisei sobre o crypto-js em:
https://qastack.com.br/programming/18279141/javascript-string-encryption-and-decryption,
https://code.google.com/archive/p/crypto-js/,
https://cryptojs.gitbook.io/docs/#pbkdf2,
https://pt.stackoverflow.com/questions/470891/criptografas-senha-com-crypto-no-node-js
*/
const CryptoJS = require('crypto-js');

const emaiPasswordlIsValid = (email, password) => {
  const emailTest = /^[a-z0-9.]+@gmail.?com$/;

  const test = emailTest.test(email);

  if (!email) return { message: 'O campo "email" é obrigatório', code: 400 };

  if (!test) return { message: 'O "email" deve ter o formato "email@email.com"', code: 400 };

  if (!password) return { message: 'O campo "password" é obrigatório', code: 400 };

  if (password.toString().length < 6) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres', code: 400 };
  }
};

const addEmailPassword = (email, password) => {
  const validado = emaiPasswordlIsValid(email, password);

  if (validado) return { err: validado };

  const stringNumber = password.toString();
  const encrypted = CryptoJS.AES.encrypt(email, stringNumber).toString();
  const corta = encrypted.slice(0, 16);

  return { message: corta, code: 200 };
};

module.exports = {
  addEmailPassword,
};
