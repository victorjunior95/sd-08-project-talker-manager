const fs = require('fs');

const HTTP_OK_STATUS = 200;

const buscarPalestrantes = (_req, res) => {
  fs.readFile('./talker.json', (_err, data) => {
    res.status(HTTP_OK_STATUS).send(JSON.parse(data));
  });
};

module.exports = buscarPalestrantes;