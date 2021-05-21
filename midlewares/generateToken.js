const crypto = require('crypto');

const generateToken = () => {
  const generatedToken = crypto.randomBytes(8).toString('hex');
  return ({ token: generatedToken });
};

module.exports = generateToken;
