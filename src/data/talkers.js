const { readFiles } = require('./index');

const getAll = async () => {
  const content = await readFiles();
  return content;
};

// getAll().then(console.log);

module.exports = {
  getAll,
}