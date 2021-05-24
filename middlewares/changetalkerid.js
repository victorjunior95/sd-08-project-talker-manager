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
  const { name, age, talk } = req.body;
  const talkerUpdate = { id: idToNumber, name, age, talk };
  // console.log(talkerUpdate);
  const updateListTalker = responseDataApi.map((list) => {
    if (list.id === idToNumber) {
      return talkerUpdate;
    }
    return responseDataApi;
  });
  // console.log(updateListTalker);
  await fs.writeFile(service, JSON.stringify(updateListTalker));
  return res.status(200).json(talkerUpdate);
};
