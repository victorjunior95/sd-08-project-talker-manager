const fs = require('fs');

module.exports = (arq, content) => new Promise((resolve, reject) => {
    fs.writeFile(arq, content, (err) => {
      if (err) reject(err.message);
      resolve('O arquivo foi escrito com sucesso');
    });
  });