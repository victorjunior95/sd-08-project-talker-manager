const fs = require('fs').promises;

module.exports = async function f(path) {
  if (typeof path !== 'string') throw new TypeError('path shoud be a string');
  const strContent = await fs.readFile(path, 'utf-8');
  return JSON.parse(strContent);
};
