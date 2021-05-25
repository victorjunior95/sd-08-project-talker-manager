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
module.exports = async (req, res, _next) => {
  const responseDataApi = await callDataApi();
  const { id } = req.params;
  const idToNumber = parseInt(id, 10);
  const newDataWithoutDelete = responseDataApi.filter((data) => data.id !== idToNumber);
  // console.log(newDataWithoutDelete);
  await fs.writeFile(service, JSON.stringify(newDataWithoutDelete));
  console.log(id);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
