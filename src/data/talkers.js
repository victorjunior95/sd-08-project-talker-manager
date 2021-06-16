const { readFiles } = require('./index');

const getAll = async () => {
  const content = await readFiles();
  return content;
};

const getById = async (id) => {
  const content = await readFiles();
  const result = content.filter((talker) => talker.id === Number(id));
    return result;
};
// getById(1).then(console.log);
// getAll().then(console.log);

module.exports = {
  getAll,
  getById,
};
