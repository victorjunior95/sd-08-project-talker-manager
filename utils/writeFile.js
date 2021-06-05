const fs = require('fs').promises;
const readFile = require('./readFile');

const writeFile = async (file, talkerData) => {
  try {
    const content = await readFile(file);
    const newTalker = {
      id: content.length + 1,
      ...talkerData,
    };
    content.push(newTalker);

    await fs.writeFile(file, JSON.stringify(content));

    return newTalker;
  } catch (err) {
    console.log(err);
  }
};

module.exports = writeFile;
