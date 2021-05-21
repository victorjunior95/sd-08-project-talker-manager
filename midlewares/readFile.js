const fs = require('fs');

const readFile = async (path) => {
  const promise = await new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(err);
      const talkers = JSON.parse(data);
      res(talkers);
    });
  });
  return promise;
};

module.exports = readFile;
