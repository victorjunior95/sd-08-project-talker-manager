const fs = require('fs');

const deletarPalestrante = (req, res) => {
  const { id } = req.params;
  const palestrantes = JSON.parse(fs.readFileSync('./talker.json'));
  const pessoa = palestrantes.filter((p) => p.id !== parseInt(id, 10));
  fs.writeFileSync('./talker.json', JSON.stringify(pessoa));
  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deletarPalestrante;
