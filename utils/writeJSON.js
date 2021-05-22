const fs = require('fs').promises;
const Path = require('path');

module.exports = async function f(path, data, recursive = false) {
  const { dir, base } = Path.parse(path);
  if (dir.includes(Path.sep)) await fs.mkdir(dir, { recursive });
  await fs.writeFile(Path.format({ dir, base }), data);
};
