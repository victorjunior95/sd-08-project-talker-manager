const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyEmptyTalk,
  verifyTalk,
} = require('../Services/dataVerify');

const readfile = require('../Services/readfile');
const writeInFIle = require('../Services/writeInFile');

const editData = (data, id, newInfo) => {
  const index = data.findIndex((elem) => elem.id === Number(id));
  const newData = data;

  newData[index].name = newInfo.name;
  newData[index].age = newInfo.age;
  newData[index].talk = newInfo.talk;

  return newData;
};

module.exports = (req, res) => {
  const talker = req.body;
  const { id } = req.params;
  const auth = req.headers.authorization;

  verifyToken(auth, res);
  verifyName(talker.name, res);
  verifyAge(talker.age, res);
  verifyEmptyTalk(talker.talk, res);
  verifyTalk(talker.talk, res);

  readfile()
  .then((data) => editData(data, id, talker))
  .then((newData) => writeInFIle('talker.json', JSON.stringify(newData)))
  .then(() => res.status(200).json({ id: Number(id), ...talker }))
  .catch((err) => console.log(err.message));
};