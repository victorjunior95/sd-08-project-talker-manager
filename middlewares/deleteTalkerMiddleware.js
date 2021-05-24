const fs = require('fs');
const { getData } = require('../utils');
const { TALKER } = require('../services');

module.exports = async (request, response, _next) => {
  const talkersListOLD = await getData(TALKER);
  const { id } = request.params;
  const talkersListNEW = talkersListOLD.filter((talker) => talker.id !== +id);
  try {
    await fs.promises.writeFile(TALKER, JSON.stringify(talkersListNEW));
    return response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return response.status(400).json(`Error: ${error.message}`);
  }
};