const fs = require('fs');
const { checkToken } = require('./middle');

const meuArquivo = 'talker.json';

module.exports = (req, res) => {
  const data = JSON.parse(fs.readFileSync(meuArquivo, 'utf-8'));
  const { authorization } = req.headers;
  const { id } = req.params;
  try {
    checkToken(authorization);
    const newData = data.filter((element) => element.id !== Number(id));
    fs.writeFileSync('talker.json', JSON.stringify(newData));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
