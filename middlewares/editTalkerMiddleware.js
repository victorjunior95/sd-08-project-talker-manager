const fs = require('fs/promises');
const { getData } = require('../utils');
const { TALKER } = require('../services');

module.exports = async (request, response, _next) => {
  const talkersList = await getData(TALKER);
  const talkerNEW = request.body;
  const { id } = request.params;
  const talkerOLD = talkersList.find((talker) => talker.id === +id);
  talkersList[+id - 1] = Object.assign(talkerOLD, talkerNEW);
  try {
    await fs.writeFile(TALKER, JSON.stringify(talkersList));
    return response.status(200).json(talkersList[+id - 1]);
  } catch (error) {
    return response.status(400).json(`Error: ${error.message}`);
  }
};