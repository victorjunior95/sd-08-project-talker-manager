const fs = require('fs').promises;

const filePath = './talker.json';

async function editTalker(id, newTalker) {
  const response = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(response);
  const index = data.findIndex((talker) => talker.id === id);

  const editedTalker = { ...newTalker, id };
  data.splice(index, 1, editedTalker);
  await fs.writeFile(filePath, JSON.stringify(data));
  return editedTalker;
}

// editTalker(1, abc).then((item) => console.log(item));

module.exports = editTalker;
