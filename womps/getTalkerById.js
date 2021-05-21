const fs = require('fs');

const meuArquivo = 'talker.json';
module.exports = (req, res) => {
  const data = JSON.parse(fs.readFileSync(meuArquivo, 'utf-8'));
  const { id } = req.params;
  const talker = data.filter((element) => element.id === Number(id));
  if (talker.length) {
    return res.status(200).send(talker[0]);
  }
  return res.status(404).send({
    message: 'Pessoa palestrante não encontrada',
  });
};