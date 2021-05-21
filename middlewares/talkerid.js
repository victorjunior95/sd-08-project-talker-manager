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

module.exports = async (req, res, _next) => {
  const { id } = req.params;
  const responseDataApi = await callDataApi();
  // console.log('registertalker');
  // const x = responseDataApi.some((data) => console.log(data.id));
  if (responseDataApi.some((data) => data.id === Number(id))) {
    const filterId = Object.assign({}, ...responseDataApi.filter((data) => data.id === Number(id)));
    // console.log(filterId);
    return res.status(200).json(filterId);
  }
  // console.log(responseDataApi[0].id);
  // console.log(x);
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};
