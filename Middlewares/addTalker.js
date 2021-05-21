const readfile = require('../Services/readfile');
const writeInFile = require('../Services/writeInFile');

const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyEmptyTalk,
  verifyTalk,
} = require('../Services/dataVerify');

module.exports = (req, res) => {
  const talker = req.body;
  const auth = req.headers.authorization;

  verifyToken(auth, res);
  verifyName(talker.name, res);
  verifyAge(talker.age, res);
  verifyEmptyTalk(talker.talk, res);
  verifyTalk(talker.talk, res);

  readfile()
  .then((data) => [...data, { id: data.length + 1, ...talker }])
  .then((data) => {
    writeInFile('talker.json', JSON.stringify(data))
    .then(() => res.status(201).json(data[data.length - 1]))
    .catch((err) => console.log(err.message));
  });
};