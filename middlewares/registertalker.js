const fs = require('fs').promises;

const service = './talker.json';

function callDataApi() {
  return fs.readFile(service, 'utf8')
  .then((data) => JSON.parse(data))
  .catch((error) => {
    console.log(`Não foi possível ler o arquivo ${service}\n Error: ${error}`);
    // process.exit(1);
  });
}

module.exports = async (_req, res, _next) => {
  const responseDataApi = await callDataApi();
  // console.log('registertalker');
  // console.log(responseDataApi);
  res.status(200).json(responseDataApi);
};
