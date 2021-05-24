const fs = require('fs');
const { checkToken } = require('./middle');

const meuArquivo = 'talker.json';

module.exports = (req, res) => {
  const data = JSON.parse(fs.readFileSync(meuArquivo, 'utf-8'));
  const { authorization } = req.headers;
  const { q } = req.query;
  try {
    checkToken(authorization);
    const newData = data.map((element) => (
      element.name.includes(q) ? element : null)).filter((value) => value !== null);
    if (newData.length) {
      return res.status(200).json(newData);
    } return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};