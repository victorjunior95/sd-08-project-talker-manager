const fs = require('fs').promises;

const readFile = require('./readFile');

const modifyFile = async (file, talkers, id, del = false) => {
  try {
    const array = await readFile(file);
    const position = array.findIndex((talker) => talker.id === parseInt(id, 10));
    let newContent;
    if (del) {
      array.splice(position, 1);
      newContent = { id: position + 1 };
    } else {
      newContent = {
        ...talkers,
        id: parseInt(id, 10),
      };
      array[position] = newContent;
    }
    await fs.writeFile(file, JSON.stringify(array));
    return newContent;
  } catch (error) { return null; }
};

  module.exports = modifyFile;