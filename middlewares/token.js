const randtoken = require('rand-token'); // https://www.npmjs.com/package/rand-token

const generateToken = () => {
  const token = randtoken.generate(16);
  return { token };
};

module.exports = generateToken;