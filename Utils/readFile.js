const fs = require('fs').promises;

const readFile = async (file) => {
  try {
    const content = await fs.readFile(file, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.log(err);
  }
};

module.exports = readFile;
