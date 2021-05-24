const fs = require('fs');
const checks = require('./middle/checks');

const meuArquivo = 'talker.json';

module.exports = (req, res) => {
  const data = JSON.parse(fs.readFileSync(meuArquivo, 'utf-8'));
  const { name, age, talk } = req.body;
  const { id } = req.params;
  try {
    checks(req);
    if (data.some((element) => element.id === Number(id))) {
      data[id - 1].name = name;
      data[id - 1].age = age;
      data[id - 1].talk = talk;
    }
    fs.writeFileSync('talker.json', JSON.stringify(data));
    res.status(200).json(data[id - 1]);
} catch (error) {
  if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
  return res.status(400).json({ message: error.message });
  }
};