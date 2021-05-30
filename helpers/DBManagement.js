const fs = require('fs');

const db = 'talker.json';

const getDB = () => JSON.parse(fs.readFileSync(db, 'utf-8'));
// console.log(getDB());

const updateDB = (content) => fs.writeFileSync(db, JSON.stringify(content));
// console.log(updateDB('textodeteste'));

const postTalker = (newTalker) => {
  const initDB = getDB();
  const addTalker = { ...newTalker, id: initDB.length + 1 };
  const newDB = [...initDB, addTalker];
  updateDB(newDB);
};

const showLastTalker = () => {
  const database = getDB();
  const lastTalker = database[database.length - 1];
  return lastTalker;
};

module.exports = {
  getDB,
  updateDB,
  postTalker,
  showLastTalker,
};

// implementação inspirada na resolução do Douglas 'Caju' Cajueiro
