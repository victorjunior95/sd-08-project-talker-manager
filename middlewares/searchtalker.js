const fs = require('fs').promises;

const service = './talker.json';

function callDataApi() {
  return fs.readFile(service, 'utf8')
  .then((data) => JSON.parse(data))
  .catch((error) => {
    console.log(`Não foi possível ler o arquivo ${service}\n Error: ${error}`);
  });
}

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
// https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
module.exports = async (req, res, _next) => {
  const responseDataApi = await callDataApi();
  const { q } = req.query;
  if (!q) return res.status(200).json(responseDataApi);
  const search = responseDataApi.filter((data) => data.name.includes(q));
  const resultSearch = [];
  if (search === undefined) {
    return res.status(200).json(resultSearch);
  }
  console.log(q);
  return res.status(200).json(search);
};
