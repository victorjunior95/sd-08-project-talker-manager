const fs = require('fs');

const adicionarPalestrante = (req, res) => {
  const palestrantes = JSON.parse(fs.readFileSync('./talker.json'));
  const { body } = req;
  body.id = palestrantes.length + 1;
  palestrantes.push(body);
  fs.writeFileSync('./talker.json', JSON.stringify(palestrantes));
  res.status(201).json(body);
};

module.exports = adicionarPalestrante;
