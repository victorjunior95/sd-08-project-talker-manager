const readfile = require('../Services/readfile');
const writeInFile = require('../Services/writeInFile');

const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyEmptyTalk,
  verifyTalk,
} = require('../Services/dataVerify');

const verifyAllTalk = (talker, res) => {
  if (verifyEmptyTalk(talker.talk, res)) return true;
  if (verifyTalk(talker.talk, res)) return true;
  return false;
};

module.exports = (req, res) => {
  const talker = req.body;
  const auth = req.headers.authorization;

  if (verifyToken(auth, res)) return;
  if (verifyName(talker.name, res)) return;
  if (verifyAge(talker.age, res)) return;
  if (verifyAllTalk(talker, res)) return;

  readfile()
  .then((data) => [...data, { id: data.length + 1, ...talker }])
  .then((data) => {
    writeInFile('talker.json', JSON.stringify(data))
    .then(() => res.status(201).json(data[data.length - 1]))
    .catch((err) => console.log(err.message));
  });
};