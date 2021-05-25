const fs = require('fs');

const dbFileName = 'talker.json';

const getDB = () => JSON.parse(fs.readFileSync(dbFileName, 'utf8'));

const updateDB = (content) => {
  fs.writeFileSync(dbFileName, JSON.stringify(content));
};

const pushTalker = (newTalker) => {
  const currDB = [...getDB()];
  const newTalkerWithid = { ...newTalker, id: currDB.length + 1 };
  const newDB = [...currDB, newTalkerWithid];
  updateDB(newDB);
};

const getLastTalker = () => {
  const db = getDB();
  const lastInDB = db[db.length - 1];
  return lastInDB;
};

const editTalker = (newTalker, talkerId) => {
  const db = [...getDB()];
  const removedOld = db.filter(({ id }) => id !== talkerId);
  const newTalkerWithId = { ...newTalker, id: talkerId };
  const updated = [...removedOld, newTalkerWithId];
  updateDB(updated);
  return updated[updated.length - 1];
};

const removeTalker = (talkerId) => {
const talkerRemoved = getDB().filter(({ id }) => id !== Number(talkerId));
updateDB(talkerRemoved);
};

module.exports = {
  getDB,
  updateDB,
  pushTalker,
  getLastTalker,
  editTalker,
  removeTalker,
};
