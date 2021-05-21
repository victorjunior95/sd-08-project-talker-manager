// Código idêntico ao mostrado nos exercícios do course, bloco_26/dia_04
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;
