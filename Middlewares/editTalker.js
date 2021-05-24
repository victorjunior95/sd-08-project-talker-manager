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

const verifyAllTalk = (talker, res) => {
  if (verifyEmptyTalk(talker.talk, res)) return true;
  if (verifyTalk(talker.talk, res)) return true;
  return false;
};

module.exports = (req, res) => {
  const talker = req.body;
  const { id } = req.params;
  const auth = req.headers.authorization;

  if (verifyToken(auth, res)) return;
  if (verifyName(talker.name, res)) return;
  if (verifyAge(talker.age, res)) return;
  if (verifyAllTalk(talker, res)) return;

  readfile()
  .then((data) => editData(data, id, talker))
  .then((newData) => writeInFIle('talker.json', JSON.stringify(newData)))
  .then(() => res.status(200).json({ id: Number(id), ...talker, rate: Number(talker.rate) }))
  .catch((err) => console.log(err.message));
};