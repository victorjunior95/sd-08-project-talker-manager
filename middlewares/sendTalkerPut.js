const rescue = require('express-rescue');
const fs = require('fs');

const sendTalkerPut = (rescue(async (request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json'));
  const { id } = request.params;
  const { name, age, talk } = request.body;
  const nTalker = { name, age, id: +id, talk };
  data[id - 1] = nTalker;

  try {
    await fs.promises.writeFile(`${__dirname}/../talker.json`, JSON.stringify(data));    
    response.status(200).send(nTalker);
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = sendTalkerPut;
