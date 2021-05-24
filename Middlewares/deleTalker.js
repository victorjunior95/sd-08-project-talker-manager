const { verifyToken } = require('../Services/dataVerify');

const readfile = require('../Services/readfile');
const writeInFile = require('../Services/writeInFile');

module.exports = (req, res) => {
  const auth = req.headers.authorization;
  const { id } = req.params;
  console.log(id);
  if (verifyToken(auth, res)) return;

  readfile()
  .then((data) => data.filter((talker) => talker.id !== Number(id)))
  // .then((data) => data.map((elem, i) => ({ ...elem, id: i + 1 }))) reorganiza ids
  .then((result) => {
    writeInFile('talker.json', JSON.stringify(result));
  })
  .then(() => {
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });
};