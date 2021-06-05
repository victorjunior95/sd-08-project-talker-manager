const fs = require('fs').promises;

const filePath = './talker.json';

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
  const talker = { ...newTalker, id };
  data.push(talker);
  await fs.writeFile(filePath, JSON.stringify(data));
  return talker;
}

// const newt = {
//   name: 'Danielle Santos',
//   age: 56,
//   talk: {
//     watchedAt: '22/10/2019',
//     rate: 5,
//   },
// };

// setNewTalker(newt).then((data) => console.log(data));

module.exports = { setNewTalker };
