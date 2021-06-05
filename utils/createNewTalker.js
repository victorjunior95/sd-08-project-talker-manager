const fs = require('fs').promises;

const filePath = '../talker.json';

function setId(arr) {
  if (arr.length === 0) {
    return 1;
  }
  return arr[arr.length - 1].id + 1;
}

async function setNewTalker(newTalker) {
  const response = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(response);
  const id = setId(data);
  data.push({ ...newTalker, id });
  await fs.writeFile(filePath, JSON.stringify(data));
  return newTalker;
}

module.exports = { setNewTalker };
