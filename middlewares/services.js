const fs = require('fs');

function readTalker() {
  try {
    const data = fs.readFileSync('./talker.json');
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}

function writeTalker(write) {
  return fs.writeFileSync('./talker.json', JSON.stringify(write));
}

// www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
function generateToken(length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
}

module.exports = {
  readTalker,
  writeTalker,
  generateToken,
};