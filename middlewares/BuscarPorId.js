const fs = require('fs');

const HTTP_OK_STATUS = 200;

const buscarPalestrantes = (req, res) => {
  const { id } = req.params;
  const palestrantes = JSON.parse(fs.readFileSync('./talker.json'));
  const pessoa = palestrantes.find((p) => p.id === parseInt(id, 10));
  if (!pessoa) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).send(pessoa);
};

module.exports = buscarPalestrantes;