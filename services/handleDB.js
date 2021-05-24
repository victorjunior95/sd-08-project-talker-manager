const fs = require('fs');

const dbFileName = 'talker.json';

const getDB = () => JSON.parse(fs.readFileSync(dbFileName, 'utf8'));

const updateDB = (content) => {
  fs.writeFileSync(dbFileName, JSON.stringify(content));
};

const pushTalker = (newTalker) => {
  const currDB = getDB();
  const newTalkerWithid = { ...newTalker, id: currDB.length + 1 };
  const updatedDB = [...currDB, newTalkerWithid];
  console.log(updatedDB);
  updateDB(updatedDB);
};

const getLastTalker = () => {
  const db = getDB();
  const lastInDB = db[db.length - 1];
  return lastInDB;
};

module.exports = {
  getDB,
  updateDB,
  pushTalker,
  getLastTalker,
};
