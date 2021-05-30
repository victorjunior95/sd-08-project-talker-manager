const path = require('path');

const fs = require('fs').promises;

const fileTalkers = path.resolve(__dirname, '../..', 'talker.json');

const readDataTalkers = async () => {
  try {
    const response = await fs.readFile(fileTalkers, 'utf-8');
    const result = JSON.parse(response);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { readDataTalkers };
