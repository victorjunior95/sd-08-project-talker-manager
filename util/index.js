const fs = require('fs');
const CryptoJS = require('crypto-js');

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

function token(email) {
  const hash = CryptoJS.MD5(email);
  const result = hash.toString().split('');
  const token16Char = result.slice(0, 16).join('');
  return token16Char;
}

function isEmail(email) {
  const regex = new RegExp(/\S+@\w+\.\w{2,}(\.\w{2})?/g);
  const result = email.match(regex);
  if (result) return result[0];
  return result;
}

module.exports = {
  getAllPeople,
  getPeopleById,
  token,
  isEmail,
};