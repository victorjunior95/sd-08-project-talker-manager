const fs = require('fs');

const editarPalestrante = (req, res) => {
  const { id } = req.params;
  const palestrantes = JSON.parse(fs.readFileSync('./talker.json'));
  const novoPalestrante = req.body;
  novoPalestrante.id = Number(id);
  const index = palestrantes.findIndex((p) => p.id === Number(id));
  palestrantes[index] = novoPalestrante;
  fs.writeFileSync('./talker.json', JSON.stringify(palestrantes));
  res.status(200).json(novoPalestrante);
};

module.exports = editarPalestrante;
