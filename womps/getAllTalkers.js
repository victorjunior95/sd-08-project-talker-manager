const fs = require('fs');

const meuArquivo = 'talker.json';

module.exports = (_req, res) => {
  const data = fs.readFileSync(meuArquivo, 'utf-8');
  if (data.length) {
    return res.status(200).send(JSON.parse(data));
  }
  return res.status(200).send(JSON.parse([]));
};