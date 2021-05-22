const fs = require('fs');

const FILE_PATH = './talker.json';

function getAllPeople() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { message: err.message, path: err.path, status: 404 };
  }
}

function getPeopleById(id) {
  try {
    const data = getAllPeople();
    const peopleId = data.find((el) => Number(el.id) === Number(id));
    return peopleId;
  } catch (err) {
    return { message: err.message, path: err.path, status: 404 };
  }
}

module.exports = {
  getAllPeople,
  getPeopleById,
};