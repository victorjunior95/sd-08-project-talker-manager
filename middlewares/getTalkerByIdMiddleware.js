const { TALKER } = require('../services');
const getData = require('../utils/getData');

module.exports = async (request, response, _next) => {
  const data = await getData(TALKER);
  const talkerById = await data.find((item) => item.id === +request.params.id);
  if (talkerById !== undefined) return response.status(200).json(talkerById);
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};
