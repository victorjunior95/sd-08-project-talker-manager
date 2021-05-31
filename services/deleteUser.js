const fs = require('fs');

module.exports = (req, res) => {
  const { id } = req.params;

  const data = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  const index = data.findIndex((obj) => obj.id === Number(id));
  data.splice(index, 1);
  fs.writeFileSync('talker.json', JSON.stringify(data));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
