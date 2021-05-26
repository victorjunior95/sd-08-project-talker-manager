const fs = require('fs').promises;

const readFile = require('./readFile');

const writeFile = async (file, talkers) => {
  try {
    const array = await readFile(file);
    const newTalker = {
      ...talkers,
      id: array.length + 1,
    };

    array.push(newTalker);
    await fs.writeFile(file, JSON.stringify(array));

    return newTalker;
  } catch (error) {
    return null;
  }
};

  module.exports = writeFile;