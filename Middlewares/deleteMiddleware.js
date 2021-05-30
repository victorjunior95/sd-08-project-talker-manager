const fs = require('fs');

const deleteMiddleware = (req, res) => {
  const { id } = req.params;
  const dbInit = JSON.parse(fs.readFileSync('./talker.json'));
  const dbRemains = dbInit.filter((person) => person.id !== +id);
  fs.writeFileSync('./talker.json', JSON.stringify(dbRemains));
  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteMiddleware;
