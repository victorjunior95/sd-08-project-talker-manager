const fs = require('fs').promises;

const readFile = require('./readFile');

const updateFile = async (file, talkerData, talkerID, opr) => {
  try {
    const data = await readFile(file);
    const position = data.findIndex(({ id }) => id === Number(talkerID));
    let modifyTalker;
    if (opr === 'delete') {
      data.splice(position, 1);
      modifyTalker = { id: position + 1 };
    } else {
      modifyTalker = {
        ...talkerData,
        id: Number(talkerID),
      };
      data[position] = modifyTalker;
    }
    await fs.writeFile(file, JSON.stringify(data));
    return modifyTalker;
  } catch (error) { console.log(error); }
};

module.exports = updateFile; 
