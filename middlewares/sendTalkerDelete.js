const rescue = require('express-rescue');
const fs = require('fs');
const data = require('../talker.json');

const sendTalkerDelete = (rescue(async (request, response) => {
  const { id } = request.params;
  const index = id - 1;
  data.splice(index, 1);

  try {
    await fs.promises.writeFile(`${__dirname}/../talker.json`, JSON.stringify(data));    
    response.status(200).send({
      message: 'Pessoa palestrante deletada com sucesso',
    });
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = sendTalkerDelete;
