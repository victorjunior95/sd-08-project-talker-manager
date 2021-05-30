const fs = require('fs');

module.exports = (req, res, _next) => {
  const { id } = req.params;
  const list = JSON.parse(fs.readFileSync('talker.json'));
  const search = list.find((index) => index.id === parseInt(id, 10));
  if (search === undefined) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(search);
};
