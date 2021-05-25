const fs = require('fs').promises;

const readFile = async (file) => {
    try {
      const text = await fs.readFile(file, 'utf8');
      return JSON.parse(text);
    } catch (error) {
      return null;
    }
  };

  module.exports = readFile;