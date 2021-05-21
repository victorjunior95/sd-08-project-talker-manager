const fs = require('fs');

const meuArquivo = 'talker.json';

module.exports = (_req, res) => {
  const data = JSON.parse(fs.readFileSync(meuArquivo, 'utf-8'));
  if (data.length) {
    return res.status(200).send(data);
  }
  return res.status(200).send([]);
};