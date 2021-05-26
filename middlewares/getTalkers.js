const fs = require('fs').promises;

const pathArquivo = './talker.json';

module.exports = (_req, res, _next) => {
  fs.readFile(pathArquivo, 'utf8')
    .then((data) => {
      if (data === []) {
        return res.status(200).json([]);
      }
      return res.status(200).json(JSON.parse(data));
    })
    .catch((err) => {
      console.error(`Não foi possível ler o arquivo ${pathArquivo}\n Erro: ${err}`);
      process.exit(1);
    });
};
