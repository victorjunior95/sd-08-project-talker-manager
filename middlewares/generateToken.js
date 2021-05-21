const SUCCESS_STATUS = 200;

// referencia função https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randonNumber() {
  const min = 0;
  const max = 61;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateToken = (req, res) => {
  const possibleCaracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let token = '';
  for (let index = 0; index < 16; index += 1) {
    const position = randonNumber();
    token += possibleCaracteres.split('')[position];
  }
  res.status(SUCCESS_STATUS).json({ token });
};

module.exports = generateToken;
